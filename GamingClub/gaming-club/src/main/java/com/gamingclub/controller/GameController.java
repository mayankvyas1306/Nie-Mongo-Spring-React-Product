package com.gamingclub.controller;

import com.gamingclub.dto.request.GameRequest;
import com.gamingclub.dto.response.ApiResponse;
import com.gamingclub.dto.response.GameResponse;
import com.gamingclub.service.GameService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/games")
public class GameController {

    private final GameService gameService;

    public GameController(GameService gameService) {
        this.gameService = gameService;
    }

    @PostMapping
    public ResponseEntity<ApiResponse<GameResponse>> createGame(@Valid @RequestBody GameRequest request) {
        GameResponse game = gameService.createGame(request);
        return ResponseEntity.ok(new ApiResponse<>("Game created successfully", game, true));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<GameResponse>>> getAllGames() {
        List<GameResponse> games = gameService.getAllGames();
        return ResponseEntity.ok(new ApiResponse<>("All games fetched successfully", games, true));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<GameResponse>> getGameById(@PathVariable String id) {
        GameResponse game = gameService.getGameById(id);
        return ResponseEntity.ok(new ApiResponse<>("Game fetched successfully", game, true));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<GameResponse>> updateGame(@PathVariable String id, @Valid @RequestBody GameRequest request) {
        GameResponse updatedGame = gameService.updateGame(id, request);
        return ResponseEntity.ok(new ApiResponse<>("Game updated successfully", updatedGame, true));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteGame(@PathVariable String id) {
        gameService.deleteGame(id);
        return ResponseEntity.ok(new ApiResponse<>("Game deleted successfully", null, true));
    }
}