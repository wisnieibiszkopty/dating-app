package com.wodowski.backend.chat;

import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/chat")
@AllArgsConstructor
public class ChatController {

    private final ChatService chatService;

    @GetMapping("/{id}")
    public ResponseEntity<Page<Chat>> getUserChats(@PathVariable String id, @RequestParam(required = true) int page){
        return ResponseEntity.ok(chatService.getUserChats(id, page));
    }

}
