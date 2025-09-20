package com.gamingclub.repository;

import com.gamingclub.model.GameSession;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface GameSessionRepository extends MongoRepository<GameSession, String> {

    List<GameSession> findByMemberId(String memberId);

    List<GameSession> findByGameId(String gameId);
}