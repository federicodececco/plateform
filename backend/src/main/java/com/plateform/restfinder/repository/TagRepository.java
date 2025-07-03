package com.plateform.restfinder.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.plateform.restfinder.model.Tag;

public interface TagRepository extends JpaRepository<Tag, Integer> {

}
