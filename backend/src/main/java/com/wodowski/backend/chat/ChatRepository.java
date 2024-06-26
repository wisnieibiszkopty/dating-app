package com.wodowski.backend.chat;

import com.wodowski.backend.notification.Notification;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface ChatRepository extends MongoRepository<Chat, String> {

    Optional<Chat> findFirstByUsers(List<String> users);
    Page<Chat> findAllByUsersContaining(String id, Pageable pageable);


}
