package com.wodowski.backend.webMessaging;

import com.wodowski.backend.notification.Notification;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.stereotype.Controller;
import org.springframework.web.util.HtmlUtils;

@Controller
public class WebMessagingController {

    @MessageMapping("/hello")
    @SendTo("/topic/greetings")
    public String greeting(String message) throws Exception {
        Thread.sleep(1000); // simulated delay
        return "Hello, " + HtmlUtils.htmlEscape(message) + "!";
    }

    // send invitation
    @MessageMapping("/notification/{id}")
    @SendToUser("/queue/notification/{id}")
    public String sendNotification(@DestinationVariable String id, @Payload String notification){
        System.out.println("Sending notification");
        System.out.println(id);
        System.out.println(notification);
        return notification;
    }

    // broadcast message
}
