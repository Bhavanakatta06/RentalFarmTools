package com.rentalfarmtools.backend.controller;

import com.rentalfarmtools.backend.model.Tool;
import com.rentalfarmtools.backend.model.User;
import com.rentalfarmtools.backend.repository.ToolRepository;
import com.rentalfarmtools.backend.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@RestController
@RequestMapping("/api/tools")
public class ToolController {

    private static final Logger logger = LoggerFactory.getLogger(ToolController.class);

    private final ToolRepository toolRepository;
    private final UserRepository userRepository;

    public ToolController(ToolRepository toolRepository, UserRepository userRepository) {
        this.toolRepository = toolRepository;
        this.userRepository = userRepository;
    }

    // ✅ Fetch all tools (for BrowseTools)
    @GetMapping
    public ResponseEntity<List<Tool>> getAllTools() {
        List<Tool> tools = toolRepository.findAll();
        logger.info("Fetched {} tools from database", tools.size());
        return ResponseEntity.ok(tools);
    }

    // ✅ Add tool (owner set from authenticated user)
    @PostMapping
    public ResponseEntity<Tool> addTool(@RequestBody Tool tool) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String normalizedEmail = authentication.getName().trim().toLowerCase();

        logger.info("Normalized email for lookup: '{}'", normalizedEmail);

        User loggedInUser = userRepository.findByEmailIgnoreCase(normalizedEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        tool.setOwner(loggedInUser);
        Tool savedTool = toolRepository.save(tool);
        logger.info("Tool '{}' added successfully for user {}", tool.getName(), loggedInUser.getEmail());
        return ResponseEntity.status(HttpStatus.CREATED).body(savedTool);
    }

    // ✅ Upload image
    @PostMapping("/upload-image")
    public ResponseEntity<String> uploadImage(@RequestParam("file") MultipartFile file) {
        try {
            String uploadDir = "uploads/";
            Path path = Paths.get(uploadDir + file.getOriginalFilename());
            Files.createDirectories(path.getParent());
            Files.write(path, file.getBytes());

            String fileUrl = "/uploads/" + file.getOriginalFilename();
            logger.info("Image uploaded successfully: {}", fileUrl);
            return ResponseEntity.ok(fileUrl);
        } catch (IOException e) {
            logger.error("Error uploading file: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                 .body("Error uploading file: " + e.getMessage());
        }
    }
    
 // ✅ Fetch tool by ID (for View Details)
    @GetMapping("/{id}")
    public ResponseEntity<Tool> getToolById(@PathVariable Long id) {
        return toolRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }


    // ✅ Update tool (only owner can update)
    @PutMapping("/{id}")
    public ResponseEntity<Tool> updateTool(@PathVariable @NonNull Long id, @RequestBody Tool updatedTool) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String normalizedEmail = authentication.getName().trim().toLowerCase();

        User loggedInUser = userRepository.findByEmailIgnoreCase(normalizedEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Tool tool = toolRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Tool not found with id " + id));

        if (!tool.getOwner().getId().equals(loggedInUser.getId())) {
            logger.warn("User {} attempted to update tool {} they do not own", loggedInUser.getEmail(), id);
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        tool.setName(updatedTool.getName());
        tool.setCategory(updatedTool.getCategory());
        tool.setDescription(updatedTool.getDescription());
        tool.setPrice(updatedTool.getPrice());
        tool.setPriceType(updatedTool.getPriceType());
        tool.setLocation(updatedTool.getLocation());
        tool.setCondition(updatedTool.getCondition());
        tool.setAvailability(updatedTool.isAvailability());
        tool.setImages(updatedTool.getImages());

        Tool savedTool = toolRepository.save(tool);
        logger.info("Tool {} updated successfully by user {}", id, loggedInUser.getEmail());
        return ResponseEntity.ok(savedTool);
    }

    // ✅ Delete tool (only owner can delete)
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTool(@PathVariable @NonNull Long id) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String normalizedEmail = authentication.getName().trim().toLowerCase();

        User loggedInUser = userRepository.findByEmailIgnoreCase(normalizedEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Tool tool = toolRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Tool not found with id " + id));

        if (!tool.getOwner().getId().equals(loggedInUser.getId())) {
            logger.warn("User {} attempted to delete tool {} they do not own", loggedInUser.getEmail(), id);
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        toolRepository.delete(tool);
        logger.info("Tool {} deleted successfully by user {}", id, loggedInUser.getEmail());
        return ResponseEntity.noContent().build();
    }
}
