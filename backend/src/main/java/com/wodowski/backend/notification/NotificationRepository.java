package com.wodowski.backend.notification;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface NotificationRepository extends MongoRepository<Notification, String> {

    Optional<Notification> getNotificationById(String id);

    long countByReceiverId(String id);
    Page<Notification> getAllByReceiverId(String id, Pageable pageable);

}
