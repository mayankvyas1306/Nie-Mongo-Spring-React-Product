package com.ecommerce_backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.List;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Document(collection = "products")
public class Product {

    @Id
    private String id;

    @NotBlank(message = "Product name cannot be empty")
    @Size(min = 2, max = 50, message = "Product name must be between 2 and 50 characters")
    private String name;

    @NotBlank(message = "Description is required")
    private String description;

    @NotBlank(message = "Category is required")
    private String category;

    @NotNull(message = "Price cannot be null")
    @Min(value = 1, message = "Price must be greater than 0")
    private Double price;

    @NotNull(message = "Stock cannot be null")
    @Min(value = 0, message = "Stock cannot be negative")
    private Integer stock;
    
    private List<String> tags;

    // Default Constructor
    public Product(){
    }

    // Paramterized Constructor
    public Product(String id, String name, String description,      
    String category, double price, int stock, List<String> tags) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.category = category;
        this.price = price;
        this.stock = stock;
        this.tags = tags;
    }

    // getter method
    public String getId() {
        return id;
    }

    // setter method
    public void setId(String id) {
        this.id = id;
    }

    // getter method
    public String getName() {
        return name;
    }

    // setter method
    public void setName(String name) {
        this.name = name;
    }

    // getter method
    public String getDescription() {
        return description;
    }

    // setter method
    public void setDescription(String description) {
        this.description = description;
    }

    // getter method
    public String getCategory() {
        return category;
    }

    // setter method
    public void setCategory(String category) {
        this.category = category;
    }

    // getter method
    public double getPrice() {
        return price;
    }

    // setter method
    public void setPrice(double price) {
        this.price = price;
    }

    // getter method
    public int getStock() {
        return stock;
    }

    // setter method
    public void setStock(int stock) {
        this.stock = stock;
    }

    // getter method
    public List<String> getTags() {
        return tags;
    }

    // setter method
    public void setTags(List<String> tags) {
        this.tags = tags;
    }
}