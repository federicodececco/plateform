package com.plateform.restfinder.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.plateform.restfinder.model.Category;

public interface CategoryRepository extends JpaRepository<Category, Integer> {

}
