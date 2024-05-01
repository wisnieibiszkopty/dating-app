package com.wodowski.backend.user;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.Data;

@Data
public class Preference {

    @Min(18) @Max(150)
    private int minAge;

    @Min(18) @Max(150)
    private int maxAge;

    // array of flags which represents interest in certain sex
    // e.g. {1, 0} means that person is only interested in man
    private boolean[] sex;

    private String location;
}
