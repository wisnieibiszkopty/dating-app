package com.wodowski.backend.matching;

import com.wodowski.backend.matching.dto.MatchingUser;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/matching")
@AllArgsConstructor
public class MatchingController {

    private final MatchingService matchingService;

    @GetMapping
    public List<MatchingUser> getMatchingUsers(){
        return matchingService.getMatchingUsers();
    }

    @PostMapping("/accept")
    public void acceptMatch(){

    }

    @PostMapping("drop")
    public void dropMatch(){

    }

}
