package com.gamingclub.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import java.time.LocalDateTime;

@Document(collection = "games")
public class Game {

    @Id
    private String id;

    @NotBlank(message = "Game name is required")
    @Size(min = 2, max = 50, message = "Game name should be 2-50 characters long")
    private String name;

    @Size(max = 500, message = "Description cannot exceed 500 characters")
    private String description;

    @Min(value = 0, message = "Cost per minute must be >= 0")
    private double costPerMinute;

    private LocalDateTime createdAt = LocalDateTime.now();

    // Getters & Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public double getCostPerMinute() { return costPerMinute; }
    public void setCostPerMinute(double costPerMinute) { this.costPerMinute = costPerMinute; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}