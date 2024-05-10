package com.wodowski.backend.chat;

import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class ChatService {

    private static final int ITEMS_PER_PAGE = 10;

    private final ChatRepository chatRepository;

    public Page<Chat> getUserChats(String id, int page){
        Pageable pageable = PageRequest.of(page, ITEMS_PER_PAGE);
        return chatRepository.findAllByUsersContaining(id, pageable);
    }

}
