package com.gamingclub.controller;

import com.gamingclub.dto.response.ApiResponse;
import com.gamingclub.dto.response.GameSessionResponse;
import com.gamingclub.service.GameSessionService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/sessions")
public class GameSessionController {

    private final GameSessionService sessionService;

    public GameSessionController(GameSessionService sessionService) {
        this.sessionService = sessionService;
    }

    @PostMapping("/start")
    public ApiResponse<GameSessionResponse> startSession(@RequestParam String memberId,
                                                         @RequestParam String gameId) {
        GameSessionResponse response = sessionService.startSession(memberId, gameId);
        return new ApiResponse<>("Session started", response, true);
    }

    @PostMapping("/stop/{sessionId}")
    public ApiResponse<GameSessionResponse> stopSession(@PathVariable String sessionId) {
        GameSessionResponse response = sessionService.stopSession(sessionId);
        return new ApiResponse<>("Session stopped", response, true);
    }

    @GetMapping
    public ApiResponse<List<GameSessionResponse>> getAllSessions() {
        return new ApiResponse<>("All sessions fetched", sessionService.getAllSessions(), true);
    }

    @GetMapping("/{id}")
    public ApiResponse<GameSessionResponse> getSessionById(@PathVariable String id) {
        return new ApiResponse<>("Session fetched", sessionService.getSessionById(id), true);
    }

    @GetMapping("/member/{memberId}")
    public ApiResponse<List<GameSessionResponse>> getSessionsByMember(@PathVariable String memberId) {
        return new ApiResponse<>("Sessions by member fetched", sessionService.getSessionsByMember(memberId), true);
    }

    @GetMapping("/game/{gameId}")
    public ApiResponse<List<GameSessionResponse>> getSessionsByGame(@PathVariable String gameId) {
        return new ApiResponse<>("Sessions by game fetched", sessionService.getSessionsByGame(gameId), true);
    }

    @DeleteMapping("/{id}")
    public ApiResponse<Void> deleteSession(@PathVariable String id) {
        sessionService.deleteSession(id);
        return new ApiResponse<>("Session deleted", null, true);
    }
}