package com.wodowski.backend.user;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@Service
public class UserService {

    private final UserRepository repository;

    private void addImages(){

    }

    private void updateProfile(){

    }

    public User deleteProfile(String id){
        return repository.deleteUserById(id).orElseThrow();
    }

}
