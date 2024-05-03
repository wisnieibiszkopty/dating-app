package com.wodowski.backend.matching;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface InvitationRepository extends MongoRepository<Invitation, String> {

    List<Invitation> getAllByReceiverId(String id);

}
