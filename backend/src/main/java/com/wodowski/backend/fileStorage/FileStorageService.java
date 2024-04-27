package com.wodowski.backend.fileStorage;

import com.wodowski.backend.user.dto.ImageDTO;
import org.springframework.stereotype.Service;
import org.springframework.util.FileSystemUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.*;
import java.util.Random;

@Service
public class FileStorageService {

    private final Path root = Paths.get("uploads/pictures");
    private static final String CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    private static Random random = new Random();
    private static final int length = 64;

    public void init(){
        try{
            Files.createDirectories(root);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    // make it more general, instead of returning ImageDTO
    // without encoding for now
    public ImageDTO save(MultipartFile file){
        try {
            //String fileName = generateRandomName();
            Path filePath =  this.root.resolve(file.getOriginalFilename());
            Files.copy(file.getInputStream(), filePath);
            return new ImageDTO(file.getOriginalFilename(), filePath.toString());
        } catch (Exception e) {
            if (e instanceof FileAlreadyExistsException) {
                throw new RuntimeException("A file of that name already exists.");
            }

            throw new RuntimeException(e.getMessage());
        }
    }

    public void delete(String filePath) throws FileSystemException {
        File file = new File(filePath);

        if(!file.exists()){
            throw new FileSystemException("File doesn't exist");
        }

        if(!file.delete()){
            throw new FileSystemException("Cannot delete file");
        }

    }

    public void deleteAll(){
        FileSystemUtils.deleteRecursively(root.toFile());
    }

    private String generateRandomName(){
        StringBuilder sb = new StringBuilder(length);
        for (int i = 0; i < length; i++) {
            int randomIndex = random.nextInt(CHARACTERS.length());
            sb.append(CHARACTERS.charAt(randomIndex));
        }
        return sb.toString();
    }

}
