package com.wodowski.backend.auth.dto;

import jakarta.validation.constraints.NotBlank;

public record RegisterRequest(
    @NotBlank(message = "Username is empty")
    String username,
    @NotBlank(message = "Email is empty")
    String email,
    @NotBlank(message = "Password is empty")
    String password
) {}
