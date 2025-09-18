package com.ecommerce_backend.dto.response;

import java.util.List;

public class OrderResponse {

    private String orderId;
    private String userId;
    private String username;   // 👈 add this
    private double totalAmount;
    private String status;
    private List<OrderItemResponse> items;

    // Getters and Setters
    public String getOrderId() {
        return orderId;
    }
    public void setOrderId(String orderId) {
        this.orderId = orderId;
    }

    public String getUserId() {
        return userId;
    }
    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getUsername() {
        return username;
    }
    public void setUsername(String username) {
        this.username = username;
    }

    public double getTotalAmount() {
        return totalAmount;
    }
    public void setTotalAmount(double totalAmount) {
        this.totalAmount = totalAmount;
    }

    public String getStatus() {
        return status;
    }
    public void setStatus(String status) {
        this.status = status;
    }

    public List<OrderItemResponse> getItems() {
        return items;
    }
    public void setItems(List<OrderItemResponse> items) {
        this.items = items;
    }
}