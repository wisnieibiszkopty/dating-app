package com.wodowski.backend.user;

import com.wodowski.backend.user.dto.FullUserDTO;
import com.wodowski.backend.user.dto.ImagesRequest;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.concurrent.CompletableFuture;

// for now only for testing

@AllArgsConstructor
@RestController
@RequestMapping("api/user")
public class UserController {

    private final UserService userService;

    @GetMapping
    public String test(){
        return "NIe możesz wejść";
    }

    // can be used to receive user info
    @GetMapping("/me")
    public ResponseEntity<User> authenticatedUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        User currentUser = (User) authentication.getPrincipal();

        return ResponseEntity.ok(currentUser);
    }

    // Can be async?
    @PostMapping("/upload-images/{id}")
    public CompletableFuture<ResponseEntity<?>> updateImages(
        @PathVariable String id,
        @RequestParam("files") List<MultipartFile> files,
        @RequestParam("filesToDelete") List<String> filesToDelete){

        userService.updateImages(id, files, filesToDelete);

        return CompletableFuture.completedFuture(
                ResponseEntity.ok("File upload started")
        );
    }


    @PatchMapping
    public ResponseEntity<?> updateUser(@RequestBody FullUserDTO user){
        return ResponseEntity.ok(userService.updateProfile(user));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable String id){
        return ResponseEntity.ok(userService.deleteProfile(id));
    }

}

