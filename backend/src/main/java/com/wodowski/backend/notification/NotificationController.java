package com.wodowski.backend.notification;

import com.wodowski.backend.exceptions.ChatAlreadyExistsException;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@AllArgsConstructor
@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

    private final NotificationService notificationService;

    @GetMapping("/{id}")
    public ResponseEntity<Page<Notification>> getNotification(@PathVariable String id, @RequestParam(required = true) int page){
        return ResponseEntity.ok(notificationService.getNotifications(id, page));
    }

    @PostMapping("/accept/{id}")
    public ResponseEntity<?> acceptNotification(@PathVariable String id) throws ChatAlreadyExistsException {
        notificationService.acceptNotification(id);
        return ResponseEntity.ok("Invitation confirmed");
    }

    @PostMapping("/reject/{id}")
    public void rejectNotification(@PathVariable String id){
        notificationService.rejectNotification(id);
    }

}
