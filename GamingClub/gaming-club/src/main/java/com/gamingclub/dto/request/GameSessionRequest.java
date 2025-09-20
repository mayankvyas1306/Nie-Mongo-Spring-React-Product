package com.gamingclub.dto.request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;

public class GameSessionRequest {

    @NotBlank(message = "Member ID is required")
    private String memberId;

    @NotBlank(message = "Game ID is required")
    private String gameId;

    @Min(value = 1, message = "Duration must be at least 1 minute")
    private int durationMinutes; // used only for testing/mock purposes

    // Getters & Setters
    public String getMemberId() { return memberId; }
    public void setMemberId(String memberId) { this.memberId = memberId; }

    public String getGameId() { return gameId; }
    public void setGameId(String gameId) { this.gameId = gameId; }

    public int getDurationMinutes() { return durationMinutes; }
    public void setDurationMinutes(int durationMinutes) { this.durationMinutes = durationMinutes; }
}