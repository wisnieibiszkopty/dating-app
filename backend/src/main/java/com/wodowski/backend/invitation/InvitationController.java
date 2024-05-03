package com.wodowski.backend.invitation;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/invitations")
public class InvitationController {

    @GetMapping
    public void getInvitations(){

    }

    @PostMapping("/accept/{id}")
    public void acceptInvitation(@PathVariable String id){

    }

    @PostMapping("/reject/{id}")
    public void rejectInvitation(@PathVariable String id){

    }

}
