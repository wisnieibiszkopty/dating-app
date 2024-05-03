package com.wodowski.backend.chat;

import com.wodowski.backend.user.dto.ImageDTO;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.Date;

@Getter
@Setter
@Document(collection = "messages")
public class Message {

    @Id private String id;

    private String chatId;
    private String senderId;

    @Field("created_at")
    @CreatedDate
    private Date createdAt;

    private String message;
    // also add other types of files
    private ImageDTO image;

    private boolean edited;
    private Date editedAt;

    public Message(String chatId, String senderId, Date createdAt, String message) {
        this.chatId = chatId;
        this.senderId = senderId;
        this.createdAt = createdAt;
        this.message = message;
    }
}
