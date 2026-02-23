package com.rentalfarmtools.backend.repository;

import com.rentalfarmtools.backend.model.Tool;
import com.rentalfarmtools.backend.model.User;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ToolRepository extends JpaRepository<Tool, Long> {
    List<Tool> findByOwner(User owner);
}
