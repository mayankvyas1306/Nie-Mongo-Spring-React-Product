package com.gamingclub.service;

import com.gamingclub.dto.response.GameSessionResponse;
import com.gamingclub.exception.InsufficientBalanceException;
import com.gamingclub.exception.ResourceNotFoundException;
import com.gamingclub.model.Game;
import com.gamingclub.model.GameSession;
import com.gamingclub.model.Member;
import com.gamingclub.repository.GameRepository;
import com.gamingclub.repository.GameSessionRepository;
import com.gamingclub.repository.MemberRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class GameSessionService {

    private static final Logger logger = LoggerFactory.getLogger(GameSessionService.class);

    private final GameSessionRepository sessionRepository;
    private final MemberRepository memberRepository;
    private final GameRepository gameRepository;

    public GameSessionService(GameSessionRepository sessionRepository,
                              MemberRepository memberRepository,
                              GameRepository gameRepository) {
        this.sessionRepository = sessionRepository;
        this.memberRepository = memberRepository;
        this.gameRepository = gameRepository;
    }

    private GameSessionResponse convertToResponse(GameSession session) {
        GameSessionResponse response = new GameSessionResponse();
        response.setId(session.getId());
        response.setMemberId(session.getMemberId());
        response.setGameId(session.getGameId());
        response.setDurationMinutes(session.getDurationMinutes());
        response.setTotalCost(session.getTotalCost());
        response.setStartedAt(session.getStartedAt());
        response.setEndedAt(session.getEndedAt());
        return response;
    }

    // Start Session
    public GameSessionResponse startSession(String memberId, String gameId) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new ResourceNotFoundException("Member not found"));

        Game game = gameRepository.findById(gameId)
                .orElseThrow(() -> new ResourceNotFoundException("Game not found"));

        GameSession session = new GameSession();
        session.setMemberId(memberId);
        session.setGameId(gameId);
        session.setStartedAt(LocalDateTime.now());

        GameSession saved = sessionRepository.save(session);
        logger.info("Session started for member {} on game {}", memberId, gameId);
        return convertToResponse(saved);
    }

    // Stop Session
    public GameSessionResponse stopSession(String sessionId) {
        GameSession session = sessionRepository.findById(sessionId)
                .orElseThrow(() -> new ResourceNotFoundException("Session not found"));

        if(session.getEndedAt() != null)
            throw new IllegalStateException("Session already stopped");

        session.setEndedAt(LocalDateTime.now());

        // Mock: 1 real minute = 5 game minutes
        long realDuration = java.time.Duration.between(session.getStartedAt(), session.getEndedAt()).toMinutes();
        int gameDuration = (int) (realDuration * 5);
        session.setDurationMinutes(gameDuration);

        Game game = gameRepository.findById(session.getGameId())
                .orElseThrow(() -> new ResourceNotFoundException("Game not found"));

        double totalCost = gameDuration * game.getCostPerMinute();
        session.setTotalCost(totalCost);

        Member member = memberRepository.findById(session.getMemberId())
                .orElseThrow(() -> new ResourceNotFoundException("Member not found"));

        if(member.getBalance() < totalCost)
            throw new InsufficientBalanceException("Not enough balance for this session");

        member.setBalance(member.getBalance() - totalCost);
        memberRepository.save(member);

        GameSession saved = sessionRepository.save(session);
        logger.info("Session stopped. Duration: {} mins, Cost: {}", gameDuration, totalCost);
        return convertToResponse(saved);
    }

    public List<GameSessionResponse> getAllSessions() {
        return sessionRepository.findAll().stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    public GameSessionResponse getSessionById(String id) {
        GameSession session = sessionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Session not found"));
        return convertToResponse(session);
    }

    public List<GameSessionResponse> getSessionsByMember(String memberId) {
        return sessionRepository.findByMemberId(memberId).stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    public List<GameSessionResponse> getSessionsByGame(String gameId) {
        return sessionRepository.findByGameId(gameId).stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    public void deleteSession(String id) {
        if(!sessionRepository.existsById(id))
            throw new ResourceNotFoundException("Session not found");
        sessionRepository.deleteById(id);
    }
}