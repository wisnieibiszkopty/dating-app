package com.wodowski.backend.auth.dto;

import com.wodowski.backend.user.dto.BasicUserDTO;

public record RegisterResponse(
        String token,
        BasicUserDTO user
) {}
