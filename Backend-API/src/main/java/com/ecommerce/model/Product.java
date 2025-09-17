//  Model Creation (Database - Table (Collection - Product))
package com.ecommerce.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.List;

@Document(collection = "products")
public class Product {

    @Id
    private String id;
    private String name;
    private String description;
    private String category;
    private double price;
    private int stock;
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
    // VS Code Shortcut - Shift + Alt + Down Arrow (For Cloning the content)
    // VS Code Shortcut - Ctrl + D (For getting the multiple cursor for same words)
    // VS Code Shortcut - Alt + Up/Down Arrow (Moving the content up or down)

    // setter method
    public void setTags(List<String> tags) {
        this.tags = tags;
    }
}