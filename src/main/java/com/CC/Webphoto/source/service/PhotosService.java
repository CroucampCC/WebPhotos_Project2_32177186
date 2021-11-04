package com.CC.Webphoto.source.service;

import com.CC.Webphoto.source.model.Photos;

import java.util.List;

public interface PhotosService {
    Photos savePhotos(Photos photos);

    Photos updatePhotos(Photos photos);

    void deletePhotos(Long photosId);

    Long numberOfPhotos();

    List<Photos> findAllPhotos();
}
