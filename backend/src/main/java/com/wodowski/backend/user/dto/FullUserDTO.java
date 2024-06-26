package com.wodowski.backend.user.dto;

import java.util.List;

public record FullUserDTO(
    String id,
    String username,
    String email,
    List<String> roles,
    boolean allDataProvided,
    String description,
    int age,
    boolean sex,
    String orientation,
    String location,
    List<ImageDTO> images,
    Preference preference

) {}
