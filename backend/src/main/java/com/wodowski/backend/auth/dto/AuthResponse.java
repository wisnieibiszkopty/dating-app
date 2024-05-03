package com.wodowski.backend.auth.dto;

import com.wodowski.backend.matching.Invitation;
import com.wodowski.backend.user.dto.FullUserDTO;

import java.util.List;

public record AuthResponse(
        String token,
        FullUserDTO user,
        List<Invitation> invitations
) {}
