package com.ecommerce_backend.exception;

public class OrderNotFoundException extends RuntimeException {
    public OrderNotFoundException(String id) {
        super("Order not found with id: " + id);
    }

    public OrderNotFoundException(String id, Throwable cause) {
        super("Order not found with id: " + id, cause);
    }
}