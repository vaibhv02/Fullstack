package com.backend.backend.Controller;

import com.backend.backend.Service.UserService;
import com.backend.backend.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
@RestController
@CrossOrigin(origins = "*")
public class UserController
{
    @Autowired
    private UserService userService;

    @RequestMapping(method = RequestMethod.GET,value="/users")
    public List<User> getALlUser()
    {
        return userService.getAllUser();
    }

    @RequestMapping(method = RequestMethod.POST , value = "/users")
    public User addUser(@RequestBody User user)
    {
        return userService.addUser(user);
    }

    @RequestMapping(method = RequestMethod.GET,value = "/users/{email}")
    public Optional<User> getUsersInfo(@PathVariable String email)
    {
        return userService.getUsersInfo(email);
    }
}
