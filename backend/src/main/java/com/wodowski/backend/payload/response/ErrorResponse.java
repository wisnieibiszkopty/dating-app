package com.wodowski.backend.payload.response;

import org.springframework.http.HttpStatus;

public record ErrorResponse(HttpStatus status, String message) {}
