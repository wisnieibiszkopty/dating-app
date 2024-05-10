package com.wodowski.backend.exceptions;

public class ChatAlreadyExistsException extends Exception {

    public ChatAlreadyExistsException(String message) {
        super(message);
    }

    public ChatAlreadyExistsException(String message, Throwable cause) {
        super(message, cause);
    }
}
