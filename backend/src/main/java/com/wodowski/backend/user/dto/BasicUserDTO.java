package com.wodowski.backend.user.dto;

import java.util.List;

public record BasicUserDTO(
        String id,
        String username,
        String email,
        List<String> roles,
        boolean allDataProvided

) {}
