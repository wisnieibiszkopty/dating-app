package com.wodowski.backend.user;

import com.wodowski.backend.matching.dto.MatchingUser;
import com.wodowski.backend.user.dto.FullUserDTO;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends MongoRepository<User, String> {

    @Query(value="{'_id': ?0}",
            fields = "{" +
                    "'_id': 1," +
                    " 'username': 1," +
                    " 'email': 1," +
                    " 'allDataProvided': 1 }")
    Optional<User> getBasicInfo(String id);

    @Query(value="{}", fields = "{password:  0, username:  0, roles:  0, allDataProvided:  0}")
    List<MatchingUser> getUsersForMatching();

    @Query(value="{'_id': ?0}", fields = "{'password':  0}")
    Optional<User> getFullInfo(String id);

    Optional<User> findByUsername(String username);
    Optional<User> findByEmail(String email);

    @Query(value = "{'email':  ?0}", fields = "{password:  0}")
    Optional<FullUserDTO> findFullUserByEmail(String email);
    Optional<User> findByEmailAndPassword(String email, String password);

    boolean existsByUsernameOrEmail(String username, String email);
    boolean existsByEmailAndPassword(String email, String password);

    Optional<User> deleteUserById(String id);


}
