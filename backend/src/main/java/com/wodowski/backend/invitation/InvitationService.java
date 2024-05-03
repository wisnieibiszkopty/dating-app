package com.wodowski.backend.invitation;

import com.wodowski.backend.chat.Chat;
import com.wodowski.backend.chat.ChatRepository;
import com.wodowski.backend.user.User;
import lombok.AllArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;


@Service
@AllArgsConstructor
public class InvitationService {

    private final InvitationRepository invitationRepository;
    private final ChatRepository chatRepository;

    public List<Invitation> getInvitations(String id){
        return null;
    }

    public void acceptInvitation(String id){
        User currentUser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Invitation invitation = invitationRepository.findById(id).orElseThrow();

        if(!Objects.equals(currentUser.getId(), invitation.getReceiverId())){
            // handle if request is not send by user who received invitation
        }

        // create new chat for users
        List<String> participants = List.of(currentUser.getId(), invitation.getSender().id());
        Chat chat = new Chat(List.of(currentUser.getId(), invitation.getSender().id()));

        // broadcast notifications to sender
    }

    public void rejectInvitation(String id){
        User currentUser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }

}
