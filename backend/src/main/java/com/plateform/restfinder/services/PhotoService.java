package com.plateform.restfinder.services;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.plateform.restfinder.controller.PhotoController;
import com.plateform.restfinder.model.Photo;
import com.plateform.restfinder.model.Place;
import com.plateform.restfinder.repository.PhotoRepository;
import com.plateform.restfinder.repository.PlaceRepository;

import reactor.core.publisher.Mono;

@Service
public class PhotoService {

    @Autowired
    private PhotoRepository photoRepository;

    @Autowired
    private GooglePlacesService googlePlacesService;

    @Autowired
    private PlaceRepository placeRepository;

    public Optional<Photo> findById(Long photoId) {
        return photoRepository.findById(photoId);

    }

    public Optional<Photo> findByPhotoReference(String placeId, String photoReference) {
        Optional<Place> place = placeRepository.findById(placeId);
        return place.flatMap(p -> photoRepository.findByPlaceAndPhotoReference(p, photoReference));
    }

    public Optional<Photo> findByFileName(String filname) {
        return photoRepository.findByFileName(filname);
    }

    public List<Photo> getDownloadsByPlaceId(String placeId) {
        return photoRepository.findByPlaceId(placeId);
    }

    public Mono<Photo> downloadAndSavePhoto(String placeId, String photoReference, int width, int height) {
        Optional<Place> placeOpt = placeRepository.findById(placeId);
        if (placeOpt.isEmpty()) {
            return Mono.error(new IllegalArgumentException("Place not found: " + placeId));
        }
        Place place = placeOpt.get();

        Optional<Photo> existing = photoRepository.findByPlaceAndPhotoReference(place, photoReference);
        if (existing.isPresent()) {
            return Mono.just(existing.get());
        }

        String safeFilename = createSafeFilename(photoReference);
        String basePath = "backend/downloaded/photos/" + safeFilename;

        Photo photo = new Photo();
        photo.setPlace(place);
        photo.setPhotoReference(photoReference);
        photo.setFileName(safeFilename);
        photo.setFilePath(basePath);
        photo.setCreatedAt(LocalDateTime.now());

        return googlePlacesService.downloadPlacePhoto(placeId, photoReference, width, height, basePath)
                .then(Mono.fromCallable(() -> {
                    try {
                        Path path = Path.of(basePath);
                        if (Files.exists(path)) {
                            String contentType = Files.probeContentType(path);
                            photo.setContentType(contentType);
                        }
                    } catch (IOException e) {
                        System.err.println("Error getting file info: " + e.getMessage());
                    }
                    return photoRepository.save(photo);
                }));
    }

    public void delete(Long photoId) {
        photoRepository.deleteById(photoId);
    }

    private String createSafeFilename(String photoReference) {
        try {
            MessageDigest md = MessageDigest.getInstance("SHA-256");
            byte[] hash = md.digest(photoReference.getBytes());

            StringBuilder hexString = new StringBuilder();
            for (byte b : hash) {
                String hex = Integer.toHexString(0xff & b);
                if (hex.length() == 1) {
                    hexString.append('0');
                }
                hexString.append(hex);
            }

            String timestamp = String.valueOf(System.currentTimeMillis());
            return hexString.substring(0, 16) + "_" + timestamp;

        } catch (NoSuchAlgorithmException e) {
            return "photo_" + System.currentTimeMillis();
        }
    }
}
