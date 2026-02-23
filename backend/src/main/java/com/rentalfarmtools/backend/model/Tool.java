package com.rentalfarmtools.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;
import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "tools")
public class Tool {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String category;

    @Column(length = 1000)
    private String description;

    private double price;

    @Enumerated(EnumType.STRING)
    private PriceType priceType; // DAY, WEEK, MONTH

    private String location;

    @Enumerated(EnumType.STRING)
    @Column(name = "tool_condition")
    private Condition condition; // EXCELLENT, GOOD, FAIR

    private boolean availability;

    private LocalDateTime createdAt = LocalDateTime.now();

    @ElementCollection
    private List<String> images;

    @ManyToOne
    @JoinColumn(name = "owner_id", referencedColumnName = "id")
    @JsonIgnoreProperties({"password", "tools"}) // ✅ include owner but hide sensitive fields
    private User owner;

    // --- Getters & Setters ---
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public double getPrice() { return price; }
    public void setPrice(double price) { this.price = price; }

    public PriceType getPriceType() { return priceType; }
    public void setPriceType(PriceType priceType) { this.priceType = priceType; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public Condition getCondition() { return condition; }
    public void setCondition(Condition condition) { this.condition = condition; }

    public boolean isAvailability() { return availability; }
    public void setAvailability(boolean availability) { this.availability = availability; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public List<String> getImages() { return images; }
    public void setImages(List<String> images) { this.images = images; }

    public User getOwner() { return owner; }
    public void setOwner(User owner) { this.owner = owner; }

    // --- Enums with custom mapping ---
    public enum PriceType {
        DAY, WEEK, MONTH;

        @JsonCreator
        public static PriceType fromValue(String value) {
            return PriceType.valueOf(value.trim().toUpperCase());
        }

        @JsonValue
        public String toValue() {
            return this.name();
        }
    }

    public enum Condition {
        EXCELLENT, GOOD, FAIR;

        @JsonCreator
        public static Condition fromValue(String value) {
            return Condition.valueOf(value.trim().toUpperCase());
        }

        @JsonValue
        public String toValue() {
            return this.name();
        }
    }
}
