package com.wodowski.backend.fileStorage;

import com.wodowski.backend.exceptions.StorageException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
public class FileStorageService {

    private final Path root;

    public FileStorageService(StorageProperties properties) {
        if(properties.getLocation().trim().length() == 0){
            throw new StorageException("File upload cannot be empty");
        }

        root = Paths.get(properties.getLocation());
    }

    public void store(MultipartFile file) throws Exception {
//        try{
//
//        } catch(IOException e){
//            System.out.println("twoj kutas moje jaja");
//            throw new Exception(e.getMessage());
//        }
    }
}
