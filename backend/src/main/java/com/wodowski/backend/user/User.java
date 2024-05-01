package com.wodowski.backend.user;

import com.wodowski.backend.user.dto.ImageDTO;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Document(collection = "users")
@Data
public class User implements UserDetails {
    @Id private String id;
    // this username is only used for authentication
    private String username;
    private String email;
    private String name;
    private String password;
    private List<String> roles;
    private boolean allDataProvided;
    private String description;
    private int age;
    private boolean sex;
    private Orientation orientation;
    private String location;
    private List<ImageDTO> photosUrls = new ArrayList<>();
    private Preference preference;


    // used during user registration
    public User(String username, String name, String email, String password, List<String> roles) {
        this.username = username;
        this.name = name;
        this.email = email;
        this.password = password;
        this.roles = roles;
        this.allDataProvided = false;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority("User"));
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    @Override
    public String toString() {
        return "User{" +
                "id='" + id + '\'' +
                ", username='" + username + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", roles=" + roles +
                '}';
    }
}
