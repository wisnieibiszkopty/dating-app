package com.wodowski.backend.controllers;

import com.wodowski.backend.payload.requests.AuthRequest;
import com.wodowski.backend.payload.requests.RegisterRequest;
import com.wodowski.backend.payload.response.AuthResponse;
import com.wodowski.backend.services.AuthService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/auth")
public class AuthController {
    private AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @GetMapping("hello")
    public String hello(){
        return "Hello world";
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@Validated @RequestBody RegisterRequest request, BindingResult result){
        if(result.hasErrors()){
            // shows too much info
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Wrong register data: " + result.getAllErrors());
        }

        return ResponseEntity.ok(authService.register(request));
    }

    @PostMapping("/authentication")
    public ResponseEntity<AuthResponse> register(@RequestBody AuthRequest request){
        return ResponseEntity.ok(authService.authenticate(request));
    }

}
