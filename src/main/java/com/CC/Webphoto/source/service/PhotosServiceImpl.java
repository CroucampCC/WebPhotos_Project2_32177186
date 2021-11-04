package com.CC.Webphoto.source.service;

import com.CC.Webphoto.source.model.Photos;
import com.CC.Webphoto.source.repository.PhotosRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class PhotosServiceImpl implements PhotosService {

    @Autowired
    private PhotosRepository photosRepository;

    @Override
    public Photos savePhotos(final Photos photos){
        photosRepository.save(photos);
        return photos;
    }

    @Override
    public Photos updatePhotos(final Photos photos){
        return photosRepository.save(photos);
    }

    @Override
    public void deletePhotos(final Long photosId){
        photosRepository.deleteById(photosId);
    }

    @Override
    public Long numberOfPhotos(){
        return photosRepository.count();
    }

    @Override
    public List<Photos> findAllPhotos(){
        return photosRepository.findAll();
    }
}
