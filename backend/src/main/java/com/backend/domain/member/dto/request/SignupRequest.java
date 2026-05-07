package com.backend.domain.member.dto.request;

import com.backend.domain.member.entity.Role;

public record SignupRequest(
        String email,
        String password,
        String name,
        String nickname,
        Role role
) {}
