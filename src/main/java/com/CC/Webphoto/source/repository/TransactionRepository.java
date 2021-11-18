package com.CC.Webphoto.source.repository;

import com.CC.Webphoto.source.model.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {
}
