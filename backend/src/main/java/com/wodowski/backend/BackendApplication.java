package com.wodowski.backend;

import com.wodowski.backend.fileStorage.FileStorageService;
import jakarta.annotation.Resource;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.config.EnableMongoAuditing;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

// maybe add separate class for mongo config

@SpringBootApplication
@EnableMongoAuditing
@EnableMongoRepositories
public class BackendApplication implements CommandLineRunner {

	@Resource
	FileStorageService storageService;

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		System.out.println("Data creation started...");

		// add something

		System.out.println("Data creation complete...");

		storageService.deleteAll();
		storageService.init();
	}
}
