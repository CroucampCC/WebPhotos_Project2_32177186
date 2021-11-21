package com.CC.Webphoto.source.repository;

import com.CC.Webphoto.source.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product, Long> {
}

