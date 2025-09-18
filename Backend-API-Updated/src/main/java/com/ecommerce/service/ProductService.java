package com.ecommerce.service;

// Importing the model
import com.ecommerce.model.Product;
// Importing the repository
import com.ecommerce.repository.ProductRepository;
// Importing the exception
import com.ecommerce.exception.ProductNotFoundException;
// Importing the Logger
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    // declare the logger to use it later 
    private static final Logger logger = LoggerFactory.getLogger(ProductService.class);
    private final ProductRepository repo;

    public ProductService(ProductRepository repo) {
        this.repo = repo;
    }

    // MongoRepository helps us to use methods like: findAll(), findById(), deleteById(), save(), existsById()
    // logger will provide different methods like: info(), warn(), error(), success()
    public List<Product> getAllProducts() {
        logger.info("Fetching all products");
        return repo.findAll();
    }

    public Product getProductById(String id) {
        logger.info("Fetching product with id {}", id);
        return repo.findById(id)
                .orElseThrow(() -> {
                    // Catching/Handling the error and showing the relevant message
                    logger.error("Product not found with id {}", id);
                    // Error is handled using Exception - ProductNotFoundException
                    return new ProductNotFoundException(id);
                });
    }

    public Product createProduct(Product product) {
        logger.info("Creating product: {}", product.getName());
        return repo.save(product);
    }

    public Product updateProduct(String id, Product updated) {
        logger.info("Updating product with id {}", id);
        return repo.findById(id).map(existing -> {
            existing.setName(updated.getName());
            existing.setDescription(updated.getDescription());
            existing.setCategory(updated.getCategory());
            existing.setPrice(updated.getPrice());
            existing.setStock(updated.getStock());
            existing.setTags(updated.getTags());
            logger.debug("Product updated: {}", existing.getName());
            return repo.save(existing);
        }).orElseThrow(() -> {
            logger.error("Product not found with id {}", id);
            return new ProductNotFoundException(id);
        });
    }

    public void deleteProduct(String id) {
        logger.info("Deleting product with id {}", id);
        if (!repo.existsById(id)) {
            logger.error("Product not found with id {}", id);
            throw new ProductNotFoundException(id);
        }
        repo.deleteById(id);
        logger.info("Product deleted successfully: {}", id);
    }
}