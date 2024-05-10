package com.wodowski.backend.chat;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/message")
@AllArgsConstructor
public class MessageController {

    private final MessageService messageService;

}
