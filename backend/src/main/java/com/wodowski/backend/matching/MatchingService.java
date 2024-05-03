package com.wodowski.backend.matching;

import com.wodowski.backend.matching.dto.MatchingUserDTO;
import com.wodowski.backend.matching.dto.UserOverviewDTO;
import com.wodowski.backend.user.User;
import com.wodowski.backend.user.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class MatchingService {

    private final UserRepository userRepository;
    private final InvitationRepository invitationRepository;

    public List<MatchingUserDTO> getMatchingUsers(){
        return userRepository.getUsersForMatching();
    }

    public void acceptMatch(String matchId){
        User currentUser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        System.out.println("user " + currentUser.getId());
        System.out.println("match " + matchId);
        System.out.println(currentUser);

        // check if this match don't already exists

        UserOverviewDTO userOverview = new UserOverviewDTO(
          currentUser.getId(),
          currentUser.getName(),
          currentUser.getPhotosUrls().get(0)
        );

        Invitation invitation = new Invitation(userOverview, matchId, "You have new invitation!");

        // broadcast invitation to user if active

        invitationRepository.save(invitation);

        // return something
    }

    public void rejectMatch(String matchId){

    }

}
