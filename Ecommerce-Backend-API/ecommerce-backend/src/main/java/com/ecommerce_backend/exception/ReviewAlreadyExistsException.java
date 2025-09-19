package com.ecommerce_backend.exception;

public class ReviewAlreadyExistsException extends RuntimeException {

    public ReviewAlreadyExistsException(String orderId, String productId) {
        super("Review already exists for product ID: " + productId + " in order ID: " + orderId);
    }
}