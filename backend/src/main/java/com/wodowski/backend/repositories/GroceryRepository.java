package com.wodowski.backend.repositories;

import com.wodowski.backend.models.GroceryItem;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface GroceryRepository extends MongoRepository<GroceryItem, String> {

    @Query("{name: '?0'}")
    GroceryItem findGroceryItemByName(String name);

    List<GroceryItem> findAll();

    @Query(value = "{category: '?0'}")
    List<GroceryItem> findAllByCategory(String category);

    public long count();

}
