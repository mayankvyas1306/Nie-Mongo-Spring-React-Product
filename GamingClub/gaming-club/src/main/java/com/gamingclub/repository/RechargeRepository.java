package com.gamingclub.repository;

import com.gamingclub.model.Recharge;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface RechargeRepository extends MongoRepository<Recharge, String> {
    List<Recharge> findByMemberId(String memberId);
}