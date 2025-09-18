package com.ecommerce.controller;

// Importing the model
import com.ecommerce.model.Product;
// Importing the service
import com.ecommerce.service.ProductService;
// Importing the validation header file
import jakarta.validation.Valid;
// Importing the logger
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
// Importing the http status to give proper response codes: Ex: 200, 201, 404, 500
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
// API Endpoint
@RequestMapping("/products")
public class ProductController {

    private static final Logger logger = LoggerFactory.getLogger(ProductController.class);
    private final ProductService service;

    public ProductController(ProductService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<Product>> getAll() {
        logger.info("GET /products");
        // Calling the Service method with GET method to fetch all the products
        return ResponseEntity.ok(service.getAllProducts());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> getOne(@PathVariable String id) {
        // Calling the Service method with GET method to fetch the product based on the product-id
        logger.info("GET /products/{}", id);
        return ResponseEntity.ok(service.getProductById(id));
    }

    @PostMapping
    public ResponseEntity<Product> create(@Valid @RequestBody Product product) {
        // Calling the Service method with POST method to store the new product details
        logger.info("POST /products");
        Product saved = service.createProduct(product);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Product> update(@PathVariable String id, @Valid @RequestBody Product product) {
        // Calling the Service method with PUT method to update the product details if it exists or handle the error using Exception Handler
        logger.info("PUT /products/{}", id);
        Product updated = service.updateProduct(id, product);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable String id) {
        // Calling the Service method with Delete method to delete the product details if it exists or handle the error using Exception Handler
        logger.info("DELETE /products/{}", id);
        service.deleteProduct(id);
        return ResponseEntity.noContent().build();
    }
}