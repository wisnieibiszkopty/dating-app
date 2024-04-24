package com.wodowski.backend.auth.dto;

import org.springframework.http.HttpStatus;

public record ErrorResponse(HttpStatus status, String message) {}
