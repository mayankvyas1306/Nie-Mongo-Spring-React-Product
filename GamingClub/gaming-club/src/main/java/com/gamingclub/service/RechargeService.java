package com.gamingclub.service;

import com.gamingclub.dto.request.RechargeRequest;
import com.gamingclub.dto.response.RechargeResponse;
import com.gamingclub.exception.ResourceNotFoundException;
import com.gamingclub.model.Member;
import com.gamingclub.model.Recharge;
import com.gamingclub.repository.MemberRepository;
import com.gamingclub.repository.RechargeRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class RechargeService {

    private static final Logger logger = LoggerFactory.getLogger(RechargeService.class);
    private final RechargeRepository rechargeRepository;
    private final MemberRepository memberRepository;

    public RechargeService(RechargeRepository rechargeRepository, MemberRepository memberRepository) {
        this.rechargeRepository = rechargeRepository;
        this.memberRepository = memberRepository;
    }

    private RechargeResponse convertToResponse(Recharge recharge) {
        RechargeResponse response = new RechargeResponse();
        response.setId(recharge.getId());
        response.setMemberId(recharge.getMemberId());
        response.setAmount(recharge.getAmount());
        response.setRechargeAt(recharge.getRechargeAt());
        return response;
    }

    public RechargeResponse rechargeBalance(RechargeRequest request) {
        logger.info("Recharging member {} with amount {}", request.getMemberId(), request.getAmount());

        Member member = memberRepository.findById(request.getMemberId())
                .orElseThrow(() -> new ResourceNotFoundException("Member not found with id " + request.getMemberId()));

        // Update member balance
        double newBalance = member.getBalance() + request.getAmount();
        member.setBalance(newBalance);
        memberRepository.save(member);

        // Save recharge record
        Recharge recharge = new Recharge();
        recharge.setMemberId(request.getMemberId());
        recharge.setAmount(request.getAmount());
        Recharge saved = rechargeRepository.save(recharge);

        // Convert to response
        RechargeResponse response = new RechargeResponse();
        response.setId(saved.getId());
        response.setMemberId(saved.getMemberId());
        response.setMemberName(member.getName());  // set member name
        response.setAmount(saved.getAmount());
        response.setUpdatedBalance(newBalance);    // set updated balance
        response.setRechargeAt(saved.getRechargeAt());

        return response;
    }

    public List<RechargeResponse> getRechargesByMember(String memberId) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new ResourceNotFoundException("Member not found with id " + memberId));

        return rechargeRepository.findByMemberId(memberId)
                .stream()
                .map(recharge -> {
                    RechargeResponse response = new RechargeResponse();
                    response.setId(recharge.getId());
                    response.setMemberId(recharge.getMemberId());
                    response.setMemberName(member.getName());        // set member name
                    response.setAmount(recharge.getAmount());
                    response.setUpdatedBalance(member.getBalance()); // optional: show current balance
                    response.setRechargeAt(recharge.getRechargeAt());
                    return response;
                })
                .collect(Collectors.toList());
    }
}