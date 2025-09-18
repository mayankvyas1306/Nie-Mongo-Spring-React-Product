package com.ecommerce.repository;
import com.ecommerce.model.Product;
import org.springframework.data.mongodb.repository.MongoRepository;

// Extending the Product Repository to MongoRepository to make use of ORM/ODM methods to simplify the CRUD operation
public interface ProductRepository extends MongoRepository<Product, String> {
    
}