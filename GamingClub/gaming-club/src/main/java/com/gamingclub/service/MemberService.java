package com.gamingclub.service;

import com.gamingclub.dto.request.MemberRequest;
import com.gamingclub.dto.response.MemberResponse;
import com.gamingclub.exception.MemberNotFoundException;
import com.gamingclub.model.Member;
import com.gamingclub.repository.MemberRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class MemberService {

    private static final Logger logger = LoggerFactory.getLogger(MemberService.class);
    private final MemberRepository memberRepository;

    public MemberService(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    private MemberResponse convertToResponse(Member member) {
        MemberResponse response = new MemberResponse();
        response.setId(member.getId());
        response.setName(member.getName());
        response.setEmail(member.getEmail());
        response.setPhone(member.getPhone());
        response.setBio(member.getBio());
        response.setRole(member.getRole());
        response.setBalance(member.getBalance());
        response.setJoinedAt(member.getJoinedAt());
        return response;
    }

    private Member convertToEntity(MemberRequest request) {
        Member member = new Member();
        member.setName(request.getName());
        member.setEmail(request.getEmail());
        member.setPhone(request.getPhone());
        member.setBio(request.getBio());
        member.setPassword(request.getPassword());
        member.setRole(request.getRole());
        member.setBalance(request.getBalance());
        return member;
    }

    public MemberResponse createMember(MemberRequest request) {
        logger.info("Creating new member with email: {}", request.getEmail());
        Member saved = memberRepository.save(convertToEntity(request));
        return convertToResponse(saved);
    }

    public List<MemberResponse> getAllMembers() {
        logger.info("Fetching all members");
        return memberRepository.findAll()
                .stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    public MemberResponse getMemberById(String id) {
        logger.info("Fetching member with ID: {}", id);
        Member member = memberRepository.findById(id)
                .orElseThrow(() -> new MemberNotFoundException("Member not found with id " + id));
        return convertToResponse(member);
    }

    public MemberResponse updateMember(String id, MemberRequest request) {
        logger.info("Updating member with ID: {}", id);
        Member member = memberRepository.findById(id)
                .orElseThrow(() -> new MemberNotFoundException("Member not found with id " + id));

        member.setName(request.getName());
        member.setEmail(request.getEmail());
        member.setPhone(request.getPhone());
        member.setBio(request.getBio());
        member.setPassword(request.getPassword());
        member.setRole(request.getRole());
        member.setBalance(request.getBalance());

        Member updated = memberRepository.save(member);
        return convertToResponse(updated);
    }

    public void deleteMember(String id) {
        logger.info("Deleting member with ID: {}", id);
        if (!memberRepository.existsById(id)) {
            throw new MemberNotFoundException("Member not found with id " + id);
        }
        memberRepository.deleteById(id);
    }

    public List<MemberResponse> getMembersByRole(String role) {
        logger.info("Fetching members with role: {}", role);
        return memberRepository.findByRole(role)
                .stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }
}