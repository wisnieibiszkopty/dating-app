package com.wodowski.backend.matching;

import com.wodowski.backend.matching.dto.MatchingUserDTO;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/matching")
@AllArgsConstructor
public class MatchingController {

    private final MatchingService matchingService;

    @GetMapping
    public List<MatchingUserDTO> getMatchingUsers(){
        return matchingService.getMatchingUsers();
    }

    @PostMapping("/accept/{matchId}")
    public ResponseEntity<?> acceptMatch(@PathVariable String matchId){
        this.matchingService.acceptMatch(matchId);
        return ResponseEntity.ok("accepted");
    }

    @PostMapping("reject/{matchId}")
    public ResponseEntity<?> rejectMatch(@PathVariable String matchId){
        this.matchingService.rejectMatch(matchId);
        return ResponseEntity.ok("rejected");
    }

}
