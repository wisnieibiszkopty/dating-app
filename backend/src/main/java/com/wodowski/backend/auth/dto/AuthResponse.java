package com.wodowski.backend.auth.dto;

import com.wodowski.backend.user.User;

public record AuthResponse(
        String token,
        User user
) {}
