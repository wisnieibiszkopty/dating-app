package com.wodowski.backend.chat;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Getter
@Setter
@Document(collection = "chats")
public class Chat {

    @Id private String id;
    private List<String> users;

    public Chat(List<String> users) {
        this.users = users;
    }
}
