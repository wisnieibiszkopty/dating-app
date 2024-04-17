package com.wodowski.backend.services;

import com.wodowski.backend.exceptions.UserExistsException;
import com.wodowski.backend.models.User;
import com.wodowski.backend.payload.requests.AuthRequest;
import com.wodowski.backend.payload.requests.RegisterRequest;
import com.wodowski.backend.payload.response.AuthResponse;
import com.wodowski.backend.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AuthService {
    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authManager;

    public AuthService(UserRepository repository,
                       PasswordEncoder passwordEncoder,
                       JwtService jwtService,
                       AuthenticationManager authManager) {
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.authManager = authManager;
    }

    public AuthResponse register(RegisterRequest request){
        // optimize
//        if(repository.existsByUsername(request.username()) || repository.existsByEmail(request.email())){
//            throw new UserExistsException("User already exists!");
//        }

        User user = new User(
                request.username(),
                request.email(),
                passwordEncoder.encode(request.password()),
                List.of("User")
        );

        System.out.println(user);

        repository.save(user);
        String jwtToken = jwtService.generateToken(user);
        return new AuthResponse(jwtToken);
    }

    public AuthResponse authenticate(AuthRequest request) {
        authManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                    request.email(),
                    request.password()
            )
        );

        User user = repository.findByEmail(request.email()).orElseThrow();
        String jwtToken = jwtService.generateToken(user);
        return new AuthResponse(jwtToken);
    }

    public void logout(){

    }
}