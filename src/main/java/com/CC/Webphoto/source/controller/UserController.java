package com.CC.Webphoto.source.controller;

import com.CC.Webphoto.source.jwt.JwtTokenProvider;
import com.CC.Webphoto.source.model.Events;
import com.CC.Webphoto.source.model.Role;
import com.CC.Webphoto.source.model.User;
import com.CC.Webphoto.source.service.EventsService;
import com.CC.Webphoto.source.service.PhotosService;
import com.CC.Webphoto.source.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.time.LocalDateTime;

@RestController
public class UserController {

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    private UserService userService;

    @Autowired
    private PhotosService photosService;

    @Autowired
    private EventsService eventsService;

    @PostMapping("/api/user/registration")
    public ResponseEntity<?> register(@RequestBody User user){
        if(userService.findByUsername(user.getUserName())!=null){
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
        user.setRole(Role.USER);
        return new ResponseEntity<>(userService.saveUser(user),HttpStatus.CREATED);
    }

    @GetMapping("/api/user/login")
    public ResponseEntity<?> getUser(Principal principal){
        //principal =
        if(principal == null){
            return ResponseEntity.ok(principal);
        }
        UsernamePasswordAuthenticationToken authenticationToken = (UsernamePasswordAuthenticationToken) principal;
        User user = userService.findByUsername(authenticationToken.getName());
        user.setToken(jwtTokenProvider.generateToken(authenticationToken));
        return new ResponseEntity<>(user ,HttpStatus.OK);
    }

    @PostMapping("/api/user/uploadPhotoEvent")
    public ResponseEntity<?> uploadPhotoEvent(@RequestBody Events events){
        events.setEventDate(LocalDateTime.now());
        return new ResponseEntity<>(eventsService.saveEvents(events),HttpStatus.CREATED);
    }

    @GetMapping("/api/user/photos")
    public ResponseEntity<?> getAllEvents(){
        return new ResponseEntity<>(photosService.findAllPhotos(),HttpStatus.OK);
    }





}
