package com.wodowski.backend.auth.dto;

import com.wodowski.backend.user.dto.FullUserDTO;

public record AuthResponse(
        String token,
        FullUserDTO user
) {}
