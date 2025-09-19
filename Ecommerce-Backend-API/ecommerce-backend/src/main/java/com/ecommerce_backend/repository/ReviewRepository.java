package com.ecommerce_backend.repository;

import com.ecommerce_backend.model.Review;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;
import java.util.List;

public interface ReviewRepository extends MongoRepository<Review, String> {
    Optional<Review> findByOrderIdAndProductId(String orderId, String productId);
    List<Review> findByProductId(String productId);
    List<Review> findByOrderId(String orderId);
}