package com.CC.Webphoto.source.repository;

import com.CC.Webphoto.source.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
}

