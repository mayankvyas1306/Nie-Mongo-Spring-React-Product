package com.gamingclub.controller;

import com.gamingclub.dto.request.RechargeRequest;
import com.gamingclub.dto.response.ApiResponse;
import com.gamingclub.dto.response.RechargeResponse;
import com.gamingclub.service.RechargeService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/recharges")
public class RechargeController {

    private final RechargeService rechargeService;

    public RechargeController(RechargeService rechargeService) {
        this.rechargeService = rechargeService;
    }

    @PostMapping
    public ApiResponse<RechargeResponse> rechargeBalance(@Valid @RequestBody RechargeRequest request) {
        RechargeResponse response = rechargeService.rechargeBalance(request);
        String message = "Recharge successful for " + response.getMemberName();
        return new ApiResponse<>(message, response, true);
    }

    @GetMapping("/member/{memberId}")
    public ApiResponse<List<RechargeResponse>> getRechargesByMember(@PathVariable String memberId) {
        List<RechargeResponse> responseList = rechargeService.getRechargesByMember(memberId);
        return new ApiResponse<>("Recharges fetched successfully", responseList, true);
    }
}