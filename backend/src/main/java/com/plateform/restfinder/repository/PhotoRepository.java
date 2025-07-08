package com.plateform.restfinder.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.plateform.restfinder.model.Photo;

public interface PhotoRepository extends JpaRepository<Photo, Long> {
    Optional<Photo> findByPlaceIdAndPhotoReference(String placeId, String photoReference);

    List<Photo> findByPlaceId(String placeId);

    Optional<Photo> findByFileName(String filename);

}
