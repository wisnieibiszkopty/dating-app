package com.wodowski.backend.auth;

import com.wodowski.backend.auth.dto.RegisterResponse;
import com.wodowski.backend.exceptions.UserExistsException;
import com.wodowski.backend.matching.Invitation;
import com.wodowski.backend.matching.InvitationRepository;
import com.wodowski.backend.user.User;
import com.wodowski.backend.auth.dto.AuthRequest;
import com.wodowski.backend.auth.dto.RegisterRequest;
import com.wodowski.backend.auth.dto.AuthResponse;
import com.wodowski.backend.user.UserRepository;
import com.wodowski.backend.user.dto.BasicUserDTO;
import com.wodowski.backend.user.dto.FullUserDTO;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final InvitationRepository invitationRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authManager;



    public RegisterResponse register(RegisterRequest request) throws UserExistsException {
        if(userRepository.existsByUsernameOrEmail(request.username(), request.email())){
            throw new UserExistsException("User with this email or username already exists!");
        }

        User user = new User(
                request.username(),
                request.username(),
                request.email(),
                passwordEncoder.encode(request.password()),
                List.of("User")
        );

        userRepository.save(user);

        BasicUserDTO basicUser = new BasicUserDTO(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getRoles(),
                user.isAllDataProvided()
        );

        String jwtToken = jwtService.generateToken(user);
        return new RegisterResponse(jwtToken, basicUser);
    }

    public AuthResponse authenticate(AuthRequest request){
        // authenticating user
        authManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                    request.email(),
                    request.password()
            )
        );

        User user = userRepository.findByEmail(request.email()).orElseThrow();

        FullUserDTO responseUser = new FullUserDTO(
                user.getId(), user.getName(), user.getEmail(),
                user.getRoles(), user.isAllDataProvided(), user.getDescription(),
                user.getAge(), user.isSex(), user.getOrientation(),
                user.getLocation(), user.getPhotosUrls(), user.getPreference()
        );

        List<Invitation> invitations = invitationRepository.getAllByReceiverId(user.getId());

        String jwtToken = jwtService.generateToken(user);
        return new AuthResponse(jwtToken, responseUser, invitations);
    }
}
