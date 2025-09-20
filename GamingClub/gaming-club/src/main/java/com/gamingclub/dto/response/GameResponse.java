package com.gamingclub.dto.response;

import java.time.LocalDateTime;

public class GameResponse {

    private String id;
    private String name;
    private String description;
    private double costPerMinute;
    private LocalDateTime createdAt;

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