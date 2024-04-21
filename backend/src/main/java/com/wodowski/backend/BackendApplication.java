package com.wodowski.backend;

import com.wodowski.backend.models.GroceryItem;
import com.wodowski.backend.repositories.GroceryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@SpringBootApplication
@EnableMongoRepositories
public class BackendApplication implements CommandLineRunner {

	@Autowired
	GroceryRepository repository;

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		System.out.println("Data creation started...");
		repository.save(new GroceryItem("Whole Wheat Biscuit", "sperma", 5, "snacks"));
		repository.save(new GroceryItem("Kodo Millet", "XYZ Kodo Millet healthy", 2, "millets"));
		repository.save(new GroceryItem("Dried Red Chilli", "Dried Whole Red Chilli", 2, "spices"));
		repository.save(new GroceryItem("Pearl Millet", "Healthy Pearl Millet", 1, "millets"));
		repository.save(new GroceryItem("Cheese Crackers", "Bonny Cheese Crackers Plain", 6, "snacks"));
		System.out.println("Data creation complete...");
	}
}
