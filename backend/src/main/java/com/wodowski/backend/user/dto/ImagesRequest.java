package com.wodowski.backend.user.dto;

import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public record ImagesRequest(
        List<MultipartFile> files,
        List<String> toDelete
){}
