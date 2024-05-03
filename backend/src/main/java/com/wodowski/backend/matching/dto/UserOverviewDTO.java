package com.wodowski.backend.matching.dto;

import com.wodowski.backend.user.dto.ImageDTO;

public record UserOverviewDTO(
   String id,
   String username,
   ImageDTO picture
) {}
