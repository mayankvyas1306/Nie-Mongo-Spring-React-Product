package com.ecommerce_backend.model;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class OrderItem {

    @NotBlank
    private String productId;  // Reference to Product

    @NotNull
    @Min(1)
    private int quantity;

    private double price; // Price at order time (snapshot)

    // --- Getters & Setters ---
    public String getProductId() {
        return productId;
    }

    public void setProductId(String productId) {
        this.productId = productId;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }
}