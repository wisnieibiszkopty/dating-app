package com.wodowski.backend.exceptions;

public class UserExistsException extends Exception{

    public UserExistsException(String message) {
        super(message);
    }
}
