package com.ecommerce_backend.service;

import com.ecommerce_backend.dto.request.ReviewRequest;
import com.ecommerce_backend.dto.response.ReviewResponse;
import com.ecommerce_backend.exception.ReviewAlreadyExistsException;
import com.ecommerce_backend.exception.ReviewNotFoundException;
import com.ecommerce_backend.exception.UserNotFoundException;
import com.ecommerce_backend.model.Review;
import com.ecommerce_backend.model.User;
import com.ecommerce_backend.repository.ReviewRepository;
import com.ecommerce_backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReviewService {

    private final ReviewRepository reviewRepo;
    private final UserRepository userRepo;

    public ReviewService(ReviewRepository reviewRepo, UserRepository userRepo) {
        this.reviewRepo = reviewRepo;
        this.userRepo = userRepo;
    }

    // Add a new review
    public ReviewResponse addReview(ReviewRequest request) {
        // Validate user exists
        User user = userRepo.findById(request.getUserId())
                .orElseThrow(() -> new UserNotFoundException(request.getUserId()));

        // Prevent multiple reviews for same product in the same order
        reviewRepo.findByOrderIdAndProductId(request.getOrderId(), request.getProductId())
                .ifPresent(r -> {
                    throw new ReviewAlreadyExistsException(request.getOrderId(), request.getProductId());
                });

        Review review = new Review();
        review.setOrderId(request.getOrderId());
        review.setProductId(request.getProductId());
        review.setUserId(user.getId());
        review.setUsername(user.getUsername());
        review.setRating(request.getRating());
        review.setMessage(request.getMessage());

        Review saved = reviewRepo.save(review);

        return mapToResponse(saved);
    }

    // Get all reviews for a specific product
    public List<ReviewResponse> getReviewsByProduct(String productId) {
        List<Review> reviews = reviewRepo.findByProductId(productId);
        if (reviews.isEmpty()) {
            throw new ReviewNotFoundException("No reviews found for product ID: " + productId);
        }
        return reviews.stream().map(this::mapToResponse).collect(Collectors.toList());
    }

    // Map Review to DTO
    private ReviewResponse mapToResponse(Review r) {
        ReviewResponse res = new ReviewResponse();
        res.setReviewId(r.getId());
        res.setOrderId(r.getOrderId());
        res.setProductId(r.getProductId());
        res.setUsername(r.getUsername());
        res.setRating(r.getRating());
        res.setMessage(r.getMessage());
        return res;
    }
}