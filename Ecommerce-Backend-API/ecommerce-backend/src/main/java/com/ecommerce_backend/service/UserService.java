package com.ecommerce_backend.service;

import com.ecommerce_backend.exception.UserNotFoundException;
import com.ecommerce_backend.model.User;
import com.ecommerce_backend.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private static final Logger logger = LoggerFactory.getLogger(UserService.class);
    private final UserRepository repo;

    public UserService(UserRepository repo) {
        this.repo = repo;
    }

    public List<User> getAllUsers() {
        logger.info("Fetching all users");
        return repo.findAll();
    }

    public User getUserById(String id) {
        logger.info("Fetching user with id {}", id);
        return repo.findById(id)
                .orElseThrow(() -> {
                    logger.error("User not found with id {}", id);
                    return new UserNotFoundException(id);
                });
    }

    public User createUser(User user) {
        logger.info("Creating user with email {}", user.getEmail());
        return repo.save(user);
    }

    public User updateUser(String id, User updated) {
        logger.info("Updating user with id {}", id);
        return repo.findById(id).map(existing -> {
            existing.setUsername(updated.getUsername());
            existing.setEmail(updated.getEmail());
            existing.setPassword(updated.getPassword());
            existing.setPhone(updated.getPhone());
            existing.setProfile(updated.getProfile());
            logger.debug("User updated: {}", existing.getUsername());
            return repo.save(existing);
        }).orElseThrow(() -> {
            logger.error("User not found with id {}", id);
            return new UserNotFoundException(id);
        });
    }

    public void deleteUser(String id) {
        logger.info("Deleting user with id {}", id);
        if (!repo.existsById(id)) {
            logger.error("User not found with id {}", id);
            throw new UserNotFoundException(id);
        }
        repo.deleteById(id);
        logger.info("User deleted successfully: {}", id);
    }
}