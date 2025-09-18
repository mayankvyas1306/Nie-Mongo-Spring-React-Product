package com.ecommerce_backend.repository;

import com.ecommerce_backend.model.Order;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface OrderRepository extends MongoRepository<Order, String> {
}