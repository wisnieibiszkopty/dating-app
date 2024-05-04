package com.wodowski.backend.notification;

import com.wodowski.backend.matching.dto.UserOverviewDTO;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

// maybe notification is better name???

@Getter
@Setter
@Document(collection = "invitations")
public class Notification {

    @Id private String id;
    private UserOverviewDTO sender;
    private String receiverId;
    private NotificationType type;
    @CreatedDate
    private Date date;

    public Notification(UserOverviewDTO sender, String receiverId, NotificationType type) {
        this.sender = sender;
        this.receiverId = receiverId;
        this.type = type;
    }

    @Override
    public String toString() {
        return "Notification{" +
                "id='" + id + '\'' +
                ", sender=" + sender +
                ", receiverId='" + receiverId + '\'' +
                ", type=" + type +
                ", date=" + date +
                '}';
    }
}
