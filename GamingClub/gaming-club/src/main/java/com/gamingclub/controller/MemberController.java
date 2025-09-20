package com.gamingclub.controller;

import com.gamingclub.dto.request.MemberRequest;
import com.gamingclub.dto.response.MemberResponse;
import com.gamingclub.dto.response.ApiResponse;
import com.gamingclub.service.MemberService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/members")
public class MemberController {

    private final MemberService memberService;

    public MemberController(MemberService memberService) {
        this.memberService = memberService;
    }

    @PostMapping
    public ResponseEntity<ApiResponse<MemberResponse>> createMember(@Valid @RequestBody MemberRequest requestDTO) {
        MemberResponse member = memberService.createMember(requestDTO);
        return ResponseEntity.ok(
            new ApiResponse<>("Member created successfully", member, true)
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<MemberResponse>> getMemberById(@PathVariable String id) {
        MemberResponse member = memberService.getMemberById(id);
        return ResponseEntity.ok(
            new ApiResponse<>("Member fetched successfully", member, true)
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<MemberResponse>> updateMember(@PathVariable String id, @Valid @RequestBody MemberRequest requestDTO) {
        MemberResponse updatedMember = memberService.updateMember(id, requestDTO);
        return ResponseEntity.ok(
            new ApiResponse<>("Member updated successfully", updatedMember, true)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteMember(@PathVariable String id) {
        memberService.deleteMember(id);
        return ResponseEntity.ok(
            new ApiResponse<>("Member deleted successfully", null, true)
        );
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<MemberResponse>>> getAllMembers() {
        List<MemberResponse> members = memberService.getAllMembers();
        return ResponseEntity.ok(
            new ApiResponse<>("All members fetched successfully", members, true)
        );
    }
}