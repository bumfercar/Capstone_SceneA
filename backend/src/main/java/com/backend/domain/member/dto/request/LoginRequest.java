package com.backend.domain.member.dto.request;

public record LoginRequest(
        String email,
        String password
) {}
