package com.wodowski.backend.auth;

import com.wodowski.backend.exceptions.UserExistsException;
import com.wodowski.backend.payload.requests.AuthRequest;
import com.wodowski.backend.payload.requests.RegisterRequest;
import com.wodowski.backend.payload.response.AuthResponse;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@AllArgsConstructor
@RestController
@RequestMapping("api/auth")
public class AuthController {
    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@Validated @RequestBody RegisterRequest request, BindingResult result) throws UserExistsException {
        if(result.hasErrors()){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Wrong register data");
        }

        return ResponseEntity.ok(authService.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> register(@RequestBody AuthRequest request){
        return ResponseEntity.ok(authService.authenticate(request));
    }

}
