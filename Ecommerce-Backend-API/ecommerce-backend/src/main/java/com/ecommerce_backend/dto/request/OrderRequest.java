package com.ecommerce_backend.dto.request;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import java.util.List;

public class OrderRequest {

    @NotNull(message = "UserId is required")
    private String userId;

    @NotEmpty(message = "Order must contain at least one item")
    private List<OrderItemRequest> items;

    // Getters and Setters
    public String getUserId() {
        return userId;
    }
    public void setUserId(String userId) {
        this.userId = userId;
    }

    public List<OrderItemRequest> getItems() {
        return items;
    }
    public void setItems(List<OrderItemRequest> items) {
        this.items = items;
    }
}