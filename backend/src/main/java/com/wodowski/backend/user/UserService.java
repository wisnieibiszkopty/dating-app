package com.wodowski.backend.user;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@AllArgsConstructor
@Service
public class UserService {

    private final UserRepository repository;

    public void updateImages(String id, List<MultipartFile> files, List<String> filesToDelete){
        User user = repository.findById(id).orElseThrow();

        files.forEach(file -> {
            
        });
    }

    private void updateProfile(){

    }

    public User deleteProfile(String id){
        return repository.deleteUserById(id).orElseThrow();
    }

}
