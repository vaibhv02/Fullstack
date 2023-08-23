package com.backend.backend.Service;

import com.backend.backend.Repository.UserRepository;
import com.backend.backend.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
@Service
public class UserService
{
    @Autowired
    private UserRepository userRepository;

    public List<User> getAllUser()
    {
        List<User> users= new ArrayList<>();
        userRepository.findAll().forEach(user  -> users.add(user));
        return users;
    }

    public Optional<User> getUsersInfo(String email)
    {
        return userRepository.findById(email);
    }

    public User addUser(User user)
    {
        userRepository.save(user);
        return user;
    }
}
