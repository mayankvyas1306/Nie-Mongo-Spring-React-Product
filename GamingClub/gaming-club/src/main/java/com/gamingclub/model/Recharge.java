package com.gamingclub.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "recharges")
public class Recharge {

    @Id
    private String id;

    private String memberId;

    private double amount;

    private LocalDateTime rechargeAt;

    public Recharge() {
        this.rechargeAt = LocalDateTime.now();
    }

    // Getters & Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getMemberId() { return memberId; }
    public void setMemberId(String memberId) { this.memberId = memberId; }

    public double getAmount() { return amount; }
    public void setAmount(double amount) { this.amount = amount; }

    public LocalDateTime getRechargeAt() { return rechargeAt; }
    public void setRechargeAt(LocalDateTime rechargeAt) { this.rechargeAt = rechargeAt; }
}