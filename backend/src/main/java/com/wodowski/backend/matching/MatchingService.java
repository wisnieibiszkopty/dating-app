package com.wodowski.backend.matching;

import com.wodowski.backend.matching.dto.MatchingUser;
import com.wodowski.backend.user.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class MatchingService {

    private final UserRepository userRepository;

    public List<MatchingUser> getMatchingUsers(){
        return userRepository.getUsersForMatching();
    }

}
