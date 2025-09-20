package com.gamingclub.dto.request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;

public class RechargeRequest {

    @NotBlank(message = "Member ID is required")
    private String memberId;

    @Min(value = 1, message = "Recharge amount must be at least 1")
    private double amount;

    // Getters & Setters
    public String getMemberId() { return memberId; }
    public void setMemberId(String memberId) { this.memberId = memberId; }

    public double getAmount() { return amount; }
    public void setAmount(double amount) { this.amount = amount; }
}