package com.CC.Webphoto.source.repository;

import com.CC.Webphoto.source.model.Photos;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PhotosRepository extends JpaRepository<Photos, Long> {

}
