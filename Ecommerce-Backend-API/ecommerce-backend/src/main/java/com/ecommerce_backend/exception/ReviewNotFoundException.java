package com.ecommerce_backend.exception;

public class ReviewNotFoundException extends RuntimeException {

    public ReviewNotFoundException(String reviewId) {
        super("Review not found with ID: " + reviewId);
    }

    public ReviewNotFoundException(String orderId, String productId) {
        super("Review not found for product ID: " + productId + " in order ID: " + orderId);
    }
}