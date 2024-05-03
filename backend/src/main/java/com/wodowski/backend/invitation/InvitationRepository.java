package com.wodowski.backend.invitation;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface InvitationRepository extends MongoRepository<Invitation, String> {

    Optional<Invitation> getInvitationById(String id);

    Page<Invitation> getAllByReceiverId(String id, Pageable pageable);

}
