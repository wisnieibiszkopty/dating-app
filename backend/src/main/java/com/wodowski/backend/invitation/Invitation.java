package com.wodowski.backend.invitation;

import com.wodowski.backend.matching.dto.UserOverviewDTO;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

// maybe notification is better name???

@Getter
@Setter
@Document(collection = "invitations")
public class Invitation {

    @Id private String id;
    private UserOverviewDTO sender;
    private String receiverId;
    // message seems useless at this point
    private String message;

    public Invitation(UserOverviewDTO sender, String receiverId, String message) {
        this.sender = sender;
        this.receiverId = receiverId;
        this.message = message;
    }
}
