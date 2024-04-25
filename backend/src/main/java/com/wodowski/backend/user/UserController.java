package com.wodowski.backend.user;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

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

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable String id){
        return ResponseEntity.ok(userService.deleteProfile(id));
    }

}
