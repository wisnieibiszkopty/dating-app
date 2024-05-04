package com.wodowski.backend.notification;

import com.wodowski.backend.chat.Chat;
import com.wodowski.backend.chat.ChatRepository;
import com.wodowski.backend.matching.dto.UserOverviewDTO;
import com.wodowski.backend.user.User;
import com.wodowski.backend.webMessaging.WebMessagingController;
import jakarta.annotation.PostConstruct;
import lombok.AllArgsConstructor;
import lombok.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;


@Service
@AllArgsConstructor
public class NotificationService {

    private final SimpMessagingTemplate messagingTemplate;
    private final WebMessagingController webMessaging;
    private final NotificationRepository notificationRepository;
    private final ChatRepository chatRepository;

    private static final int ITEMS_PER_PAGE = 10;

    // maybe I will have to add sorting in future
    public Page<Notification> getNotifications(String id, int numberOfPage){
        Pageable pageable = PageRequest.of(numberOfPage, ITEMS_PER_PAGE);
        Page<Notification> notifications = notificationRepository.getAllByReceiverId(id, pageable);
        System.out.println(notifications);
        return notifications;
    }

    @Transactional
    public void acceptNotification(String id){
        User currentUser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Notification notification = notificationRepository.findById(id).orElseThrow();

        if(!Objects.equals(currentUser.getId(), notification.getReceiverId())){
            // handle if request is not send by user who received notification
        }

        // create new chat for users
        List<String> participants = new ArrayList<>();
        participants.add(notification.getReceiverId());
        participants.add(notification.getSender().id());
        // need to be sorted to find document in database
        Collections.sort(participants);

        Optional<Chat> existingChat = chatRepository.findFirstByUsers(participants);
        if(existingChat.isPresent()){
           // throw error because that chat already exists
        }

        Chat chat = new Chat(participants);
        chatRepository.save(chat);

        // broadcast notifications to sender
        UserOverviewDTO confirmingUser = new UserOverviewDTO(
                currentUser.getId(),
                currentUser.getName(),
                currentUser.getPhotosUrls().get(0)
        );

        Notification invitationConfirmed = new Notification(
                confirmingUser,
                notification.getSender().id(),
                NotificationType.INVITATION_CONFIRM);

        // hope it will work 😭😭😭
        //webMessaging.sendNotification(notification.getSender().id(), invitationConfirmed);
    }

    public void rejectNotification(String id){
        User currentUser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }

}
