package com.practice;

import org.springframework.boot.SpringApplication;

import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

@SpringBootApplication
public class PracticeBackendApplication extends SpringBootServletInitializer{

	public static void main(String[] args) {
		SpringApplication.run(PracticeBackendApplication.class, args);
		System.out.println("Practice Project is running...!");
	}

}
