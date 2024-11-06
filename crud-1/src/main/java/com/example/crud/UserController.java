package com.example.crud;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/students/add")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public List<Account> getAllUsers() {
        return userRepository.findAll();
    }

    @PostMapping
    public Account createUser(@RequestBody Account user) {
        return userRepository.save(user);
    }
}