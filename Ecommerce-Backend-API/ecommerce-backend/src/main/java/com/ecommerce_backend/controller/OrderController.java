package com.ecommerce_backend.controller;

import com.ecommerce_backend.dto.request.OrderRequest;
import com.ecommerce_backend.dto.response.OrderResponse;
import com.ecommerce_backend.service.OrderService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/orders")
@CrossOrigin(origins = "http://localhost:5173")
public class OrderController {

    private final OrderService service;

    public OrderController(OrderService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<OrderResponse> placeOrder(@Valid @RequestBody OrderRequest request) {
        return ResponseEntity.ok(service.placeOrder(request));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<OrderResponse>> getUserOrders(@PathVariable String userId) {
        return ResponseEntity.ok(service.getOrdersByUser(userId));
    }

    @PutMapping("/{orderId}/status/{status}")
    public ResponseEntity<OrderResponse> updateStatus(
            @PathVariable String orderId,
            @PathVariable String status) {
        return ResponseEntity.ok(service.updateStatus(orderId, status));
    }
}