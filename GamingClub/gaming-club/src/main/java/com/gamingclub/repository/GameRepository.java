package com.gamingclub.repository;

import com.gamingclub.model.Game;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface GameRepository extends MongoRepository<Game, String> {
    // additional query methods can be added later
}