package com.ecommerce_backend.controller;

import com.ecommerce_backend.dto.request.ReviewRequest;
import com.ecommerce_backend.dto.response.ReviewResponse;
import com.ecommerce_backend.service.ReviewService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/reviews")
@CrossOrigin(origins = "http://localhost:5173")
public class ReviewController {

    private final ReviewService service;

    public ReviewController(ReviewService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<ReviewResponse> addReview(@Valid @RequestBody ReviewRequest request) {
        return ResponseEntity.ok(service.addReview(request));
    }

    @GetMapping("/product/{productId}")
    public ResponseEntity<List<ReviewResponse>> getReviewsByProduct(@PathVariable String productId) {
        return ResponseEntity.ok(service.getReviewsByProduct(productId));
    }
}