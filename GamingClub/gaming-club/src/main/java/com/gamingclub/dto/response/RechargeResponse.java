package com.gamingclub.dto.response;

import java.time.LocalDateTime;

public class RechargeResponse {

    private String id;
    private String memberId;
    private String memberName;  // new field
    private double amount;
    private double updatedBalance;  // new field
    private LocalDateTime rechargeAt;

    // Getters & Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getMemberId() { return memberId; }
    public void setMemberId(String memberId) { this.memberId = memberId; }

    public String getMemberName() { return memberName; }
    public void setMemberName(String memberName) { this.memberName = memberName; }

    public double getAmount() { return amount; }
    public void setAmount(double amount) { this.amount = amount; }

    public double getUpdatedBalance() { return updatedBalance; }
    public void setUpdatedBalance(double updatedBalance) { this.updatedBalance = updatedBalance; }

    public LocalDateTime getRechargeAt() { return rechargeAt; }
    public void setRechargeAt(LocalDateTime rechargeAt) { this.rechargeAt = rechargeAt; }
}