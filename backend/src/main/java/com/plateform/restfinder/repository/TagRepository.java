package com.plateform.restfinder.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.plateform.restfinder.model.Tag;

import java.util.Optional;

public interface TagRepository extends JpaRepository<Tag, Integer> {

    Optional<Tag> findByGoogleName(String googleName);

}
