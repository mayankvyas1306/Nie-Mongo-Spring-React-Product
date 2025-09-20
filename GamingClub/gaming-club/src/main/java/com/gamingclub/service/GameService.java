package com.gamingclub.service;

import com.gamingclub.dto.request.GameRequest;
import com.gamingclub.dto.response.GameResponse;
import com.gamingclub.dto.response.ApiResponse;
import com.gamingclub.exception.ResourceNotFoundException;
import com.gamingclub.model.Game;
import com.gamingclub.repository.GameRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class GameService {

    private static final Logger logger = LoggerFactory.getLogger(GameService.class);
    private final GameRepository gameRepository;

    public GameService(GameRepository gameRepository) {
        this.gameRepository = gameRepository;
    }

    private GameResponse convertToResponse(Game game) {
        GameResponse response = new GameResponse();
        response.setId(game.getId());
        response.setName(game.getName());
        response.setDescription(game.getDescription());
        response.setCostPerMinute(game.getCostPerMinute());
        response.setCreatedAt(game.getCreatedAt());
        return response;
    }

    private Game convertToEntity(GameRequest request) {
        Game game = new Game();
        game.setName(request.getName());
        game.setDescription(request.getDescription());
        game.setCostPerMinute(request.getCostPerMinute());
        return game;
    }

    public GameResponse createGame(GameRequest request) {
        logger.info("Creating new game: {}", request.getName());
        Game saved = gameRepository.save(convertToEntity(request));
        return convertToResponse(saved);
    }

    public List<GameResponse> getAllGames() {
        logger.info("Fetching all games");
        return gameRepository.findAll()
                .stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    public GameResponse getGameById(String id) {
        Game game = gameRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Game not found with id " + id));
        return convertToResponse(game);
    }

    public GameResponse updateGame(String id, GameRequest request) {
        logger.info("Updating game with id: {}", id);
        Game game = gameRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Game not found with id " + id));

        game.setName(request.getName());
        game.setDescription(request.getDescription());
        game.setCostPerMinute(request.getCostPerMinute());

        Game updated = gameRepository.save(game);
        return convertToResponse(updated);
    }

    public void deleteGame(String id) {
        logger.info("Deleting game with id: {}", id);
        if (!gameRepository.existsById(id)) {
            throw new ResourceNotFoundException("Game not found with id " + id);
        }
        gameRepository.deleteById(id);
    }
}