package com.wodowski.backend.payload.requests;

import jakarta.validation.constraints.NotBlank;

public record AuthRequest(
        @NotBlank
        String email,
        @NotBlank
        String password
) {}
