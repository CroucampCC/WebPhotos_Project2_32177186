package com.CC.Webphoto.source.model;

import liquibase.pro.packaged.C;
import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name="product")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="name")
    private String name;

    @Column(name="price")
    private Double price;

    @Column(name="explanation")
    private String explanation;

    @Column(name="url")
    private String url;

    @Column(name="Location")
    private String location;
}
