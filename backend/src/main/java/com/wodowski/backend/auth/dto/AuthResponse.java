package com.wodowski.backend.auth.dto;

import com.wodowski.backend.invitation.Invitation;
import com.wodowski.backend.user.dto.FullUserDTO;
import org.springframework.data.domain.Page;

public record AuthResponse(
        String token,
        FullUserDTO user,
        Page<Invitation> invitations
) {}
