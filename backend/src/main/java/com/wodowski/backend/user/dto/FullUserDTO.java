package com.wodowski.backend.user.dto;

import com.wodowski.backend.user.Orientation;

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
   Orientation orientation,
   String location,
   List<String> photosUrls

) {}
