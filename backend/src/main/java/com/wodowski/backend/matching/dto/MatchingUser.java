package com.wodowski.backend.matching.dto;

import com.wodowski.backend.user.dto.ImageDTO;
import com.wodowski.backend.user.dto.Preference;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class MatchingUser {

    private String id;
    private String name;
    private String description;
    private int age;
    private boolean sex;
    private String orientation;
    private String location;
    private List<ImageDTO> photosUrls = new ArrayList<>();
    private Preference preference;
}
