package com.gamingclub.dto.request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;

public class GameRequest {

    @NotBlank(message = "Game name is required")
    private String name;

    private String description;

    @Min(value = 0, message = "Cost per minute must be >= 0")
    private double costPerMinute;

    // Getters & Setters
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public double getCostPerMinute() { return costPerMinute; }
    public void setCostPerMinute(double costPerMinute) { this.costPerMinute = costPerMinute; }
}