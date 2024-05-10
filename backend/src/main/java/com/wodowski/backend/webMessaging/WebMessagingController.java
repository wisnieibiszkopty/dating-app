package com.wodowski.backend.webMessaging;

import com.wodowski.backend.notification.Notification;
import lombok.AllArgsConstructor;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.stereotype.Controller;
import org.springframework.web.util.HtmlUtils;

@Controller
@AllArgsConstructor
public class WebMessagingController {

    private final SimpMessagingTemplate messagingTemplate;

    // for testing connection
    @MessageMapping("/hello")
    @SendTo("/topic/greetings")
    public String greeting(String message) throws Exception {
        Thread.sleep(1000); // simulated delay
        return "Hello, " + HtmlUtils.htmlEscape(message) + "!";
    }

    // send notification
    @MessageMapping("/notification/{id}")
    public void sendNotification(@DestinationVariable String id, @Payload Notification notification){
        System.out.println("Sending notification");
        System.out.println(id);
        System.out.println(notification);
        messagingTemplate.convertAndSend("/queue/notification/" + id, notification);
    }

    // send chat message
}
