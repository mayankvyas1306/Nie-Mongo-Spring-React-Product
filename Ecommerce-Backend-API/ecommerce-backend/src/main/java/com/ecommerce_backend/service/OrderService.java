package com.ecommerce_backend.service;

import com.ecommerce_backend.dto.request.OrderRequest;
import com.ecommerce_backend.dto.request.OrderItemRequest;
import com.ecommerce_backend.dto.response.OrderResponse;
import com.ecommerce_backend.dto.response.OrderItemResponse;
import com.ecommerce_backend.exception.OrderNotFoundException;
import com.ecommerce_backend.exception.ProductNotFoundException;
import com.ecommerce_backend.exception.UserNotFoundException;
import com.ecommerce_backend.model.Order;
import com.ecommerce_backend.model.OrderItem;
import com.ecommerce_backend.model.Product;
import com.ecommerce_backend.repository.OrderRepository;
import com.ecommerce_backend.repository.ProductRepository;
import com.ecommerce_backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderService {

    private final OrderRepository orderRepo;
    private final ProductRepository productRepo;
    private final UserRepository userRepo;

    public OrderService(OrderRepository orderRepo, ProductRepository productRepo, UserRepository userRepo) {
        this.orderRepo = orderRepo;
        this.productRepo = productRepo;
        this.userRepo = userRepo;
    }

    public OrderResponse placeOrder(OrderRequest request) {
        // ✅ Validate user
        userRepo.findById(request.getUserId())
                .orElseThrow(() -> new UserNotFoundException(request.getUserId()));

        double total = 0;
        List<OrderItem> items = request.getItems().stream().map(itemReq -> {
            Product product = productRepo.findById(itemReq.getProductId())
                    .orElseThrow(() -> new ProductNotFoundException(itemReq.getProductId()));

            if (product.getStock() < itemReq.getQuantity()) {
                throw new RuntimeException("Not enough stock for product: " + product.getName());
            }

            product.setStock(product.getStock() - itemReq.getQuantity());
            productRepo.save(product);

            OrderItem item = new OrderItem();
            item.setProductId(product.getId());
            item.setQuantity(itemReq.getQuantity());
            item.setPrice(product.getPrice() * itemReq.getQuantity());

            return item;
        }).toList();

        total = items.stream().mapToDouble(OrderItem::getPrice).sum();

        Order order = new Order();
        order.setUserId(request.getUserId());
        order.setItems(items);
        order.setTotalAmount(total);
        order.setStatus("PENDING");

        Order savedOrder = orderRepo.save(order);
        return mapToResponse(savedOrder);
    }

    public List<OrderResponse> getOrdersByUser(String userId) {
        userRepo.findById(userId)
                .orElseThrow(() -> new UserNotFoundException(userId));

        return orderRepo.findAll().stream()
                .filter(order -> order.getUserId().equals(userId))
                .map(this::mapToResponse)
                .toList();
    }

    public OrderResponse updateStatus(String orderId, String status) {
        Order order = orderRepo.findById(orderId)
                .orElseThrow(() -> new OrderNotFoundException(orderId));
        order.setStatus(status);
        Order updated = orderRepo.save(order);
        return mapToResponse(updated);
    }

    private OrderResponse mapToResponse(Order order) {
        OrderResponse response = new OrderResponse();
        response.setOrderId(order.getId());
        response.setUserId(order.getUserId());

        // 👇 fetch user and set username
        String username = userRepo.findById(order.getUserId())
                .orElseThrow(() -> new UserNotFoundException(order.getUserId()))
                .getUsername();
        response.setUsername(username);

        response.setTotalAmount(order.getTotalAmount());
        response.setStatus(order.getStatus());

        List<OrderItemResponse> itemResponses = order.getItems().stream().map(item -> {
            Product product = productRepo.findById(item.getProductId())
                    .orElseThrow(() -> new ProductNotFoundException(item.getProductId()));

            OrderItemResponse itemRes = new OrderItemResponse();
            itemRes.setProductId(product.getId());
            itemRes.setProductName(product.getName());
            itemRes.setQuantity(item.getQuantity());
            itemRes.setPrice(item.getPrice());
            return itemRes;
        }).collect(Collectors.toList());

        response.setItems(itemResponses);
        return response;
    }
}