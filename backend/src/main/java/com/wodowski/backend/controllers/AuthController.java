package com.wodowski.backend.controllers;

import com.wodowski.backend.exceptions.UserExistsException;
import com.wodowski.backend.models.GroceryItem;
import com.wodowski.backend.payload.requests.AuthRequest;
import com.wodowski.backend.payload.requests.RegisterRequest;
import com.wodowski.backend.payload.response.AuthResponse;
import com.wodowski.backend.repositories.GroceryRepository;
import com.wodowski.backend.services.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/auth")
public class AuthController {
    private final AuthService authService;

    @Autowired
    GroceryRepository repository;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    // testing connection with mongo db database
    @GetMapping("hello")
    public String hello(){
        return "Hello world";
    }

    @GetMapping("all")
    public List<GroceryItem> getAll(){
        List<GroceryItem> items = repository.findAll();
        items.forEach(groceryItem -> {
            System.out.println(groceryItem.toString());
        });
        return items;
    }

    @GetMapping("byname/{name}")
    public GroceryItem findByName(@PathVariable String name){
        System.out.println(name);
        System.out.println(repository.findGroceryItemByName(name));
        return repository.findGroceryItemByName(name);
    }

    @PostMapping("save")
    public GroceryItem addGroceryItem(@RequestBody GroceryItem item){
        System.out.println(item);
        return repository.save(item);
    }

    // real routes
    @PostMapping("/register")
    public ResponseEntity<?> register(@Validated @RequestBody RegisterRequest request, BindingResult result) throws UserExistsException {
        if(result.hasErrors()){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Wrong register data");
        }

        return ResponseEntity.ok(authService.register(request));
    }

    @PostMapping("/authentication")
    public ResponseEntity<AuthResponse> register(@RequestBody AuthRequest request){
        return ResponseEntity.ok(authService.authenticate(request));
    }

}
