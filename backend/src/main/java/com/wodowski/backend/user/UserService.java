package com.wodowski.backend.user;

import com.wodowski.backend.fileStorage.FileStorageService;
import com.wodowski.backend.user.dto.ImageDTO;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.FileSystemException;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CompletableFuture;

@AllArgsConstructor
@Service
public class UserService {

    private final UserRepository repository;
    private final FileStorageService fileStorageService;

    @Transactional
    // limit number of files to 10
    public void updateImages(String id, List<MultipartFile> files, List<String> filesToDelete){
        User user = repository.findById(id).orElseThrow();
        List<ImageDTO> imagesList = user.getPhotosUrls();

        files.forEach(file -> {
            ImageDTO image = fileStorageService.save(file);
            imagesList.add(image);
        });


        System.out.println(imagesList);

        // add deleting files
        if(!filesToDelete.isEmpty()){
            filesToDelete.forEach(file -> {
                try {
                    System.out.println(file);
                    fileStorageService.delete(file);
                } catch (FileSystemException e) {
                    throw new RuntimeException(e);
                }
            });
        }

        user.setPhotosUrls(imagesList);
        repository.save(user);

    }

    private void updateProfile(){

    }

    public User deleteProfile(String id){
        return repository.deleteUserById(id).orElseThrow();
    }

}
