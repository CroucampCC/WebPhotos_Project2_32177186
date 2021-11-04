package com.CC.Webphoto.source.controller;

import com.CC.Webphoto.source.model.Photos;
import com.CC.Webphoto.source.model.StringResponse;
import com.CC.Webphoto.source.model.User;
import com.CC.Webphoto.source.service.EventsService;
import com.CC.Webphoto.source.service.PhotosService;
import com.CC.Webphoto.source.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class AdminController {

    @Autowired
    private UserService userService;
    @Autowired
    private EventsService eventsService;
    @Autowired
    private PhotosService photosService;

    @PutMapping("/api/admin/user-update")
    public ResponseEntity<?> updateUser(@RequestBody User user){
        User existUser = userService.findByUsername(user.getUserName());

        if(existUser!=null && (existUser.getId() != user.getId())){
                return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
        return new ResponseEntity<>(userService.updateUser(user),HttpStatus.CREATED);
    }

    @PostMapping("/api/admin/user-delete")
    public ResponseEntity<?> deleteUser(@RequestBody User user){
        userService.deleteUser(user.getId());
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/api/admin/user-all")
    public ResponseEntity<?> findAllUsers(){
        return new ResponseEntity<>(userService.findAllUsers(),HttpStatus.OK);
    }

    @GetMapping("/api/admin/user-number")
    public ResponseEntity<?> numberOfUsers(){
        Long number = userService.numberOfUsers();
        StringResponse response = new StringResponse();
        return new ResponseEntity<>(response,HttpStatus.OK);
    }

    @PostMapping("/api/admin/photos-create")
    public ResponseEntity<?> uploadPhoto(@RequestBody Photos photos){
        return new ResponseEntity<>(photosService.savePhotos(photos),HttpStatus.CREATED);
    }

    @PutMapping("/api/admin/photos-update")
    public ResponseEntity<?> updatePhotos(@RequestBody Photos photos){
        return new ResponseEntity<>(photosService.updatePhotos(photos),HttpStatus.CREATED);
    }

    @PostMapping("/api/admin/photos-delete")
    public ResponseEntity<?> deletePhotos(@RequestBody Photos photos){
        photosService.deletePhotos(photos.getId());
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/api/admin/photos-all")
    public ResponseEntity<?> findAllPhotos(){
        return new ResponseEntity<>(photosService.findAllPhotos(),HttpStatus.OK);
    }

    @GetMapping("/api/admin/photos-number")
    public ResponseEntity<?> numberOfPhotos(){
        Long number = photosService.numberOfPhotos();
        StringResponse response = new StringResponse();
        return new ResponseEntity<>(response,HttpStatus.OK);
    }

    @GetMapping("/api/admin/events-all")
    public ResponseEntity<?> findAllEvents(){
        return new ResponseEntity<>(eventsService.findAllEvents(),HttpStatus.OK);
    }

    @GetMapping("/api/admin/events-number")
    public ResponseEntity<?> NumberOfEvents(){
        Long number = eventsService.numberOfEvents();
        StringResponse response = new StringResponse();
        return new ResponseEntity<>(response,HttpStatus.OK);
    }
}
