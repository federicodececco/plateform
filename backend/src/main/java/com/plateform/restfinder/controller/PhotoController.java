package com.plateform.restfinder.controller;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.plateform.restfinder.model.Photo;
import com.plateform.restfinder.services.PhotoService;

import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/photo")
public class PhotoController {

    @Autowired
    PhotoService photoService;

    public Mono<ResponseEntity<Photo>> show(@PathVariable Long id) {
        try {
            Optional<Photo> photoOpt = photoService.findById(id);
            if (photoOpt.isPresent()) {
                return Mono.just(new ResponseEntity<>(photoOpt.get(), HttpStatus.OK));

            }
            return Mono.just(new ResponseEntity<>(HttpStatus.NOT_FOUND));
        } catch (Exception e) {
            System.err.print(e);
            return Mono.just(new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR));
        }
    }

    @DeleteMapping("/delete{id}")
    public Mono<ResponseEntity<Photo>> delete(@PathVariable Long id) {
        try {
            if (photoService.findById(id).isPresent()) {
                photoService.delete(id);
                return Mono.just(new ResponseEntity<>(HttpStatus.OK));
            }
            return Mono.just(new ResponseEntity<>(HttpStatus.NOT_FOUND));
        } catch (Exception e) {
            System.err.print(e);
            return Mono.just(new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR));
        }
    }

    @GetMapping("/json/{param}")
    public Mono<ResponseEntity<Photo>> getPhoto(@PathVariable String param) {
        try {
            Optional<Photo> photoOpt = photoService.findByFileName(param);
            if (!photoOpt.isEmpty()) {
                return Mono.just(ResponseEntity.ok(photoOpt.get()));
            } else
                return Mono.just(new ResponseEntity<>(HttpStatus.NOT_FOUND));

        } catch (Exception e) {
            return Mono.just(new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR));
        }
    }

    @GetMapping("/filename/{filename}")
    public Mono<ResponseEntity<Resource>> getPhotoFile(@PathVariable String filename) {
        return Mono.fromCallable(() -> {
            try {

                Path filePath = Paths.get("plateform/backend/downloaded/photos/" + filename + ".jpg");

                if (!Files.exists(filePath)) {
                    filePath = Paths.get("plateform/backend/downloaded/photos/" + filename + ".png");
                }

                if (!Files.exists(filePath)) {
                    return ResponseEntity.notFound().build();
                }

                Resource resource = new FileSystemResource(filePath.toFile());

                String contentType = Files.probeContentType(filePath);
                if (contentType == null) {
                    contentType = "image/jpeg";
                }

                return ResponseEntity.ok()
                        .contentType(MediaType.parseMediaType(contentType))
                        .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + filename + ".jpg\"")
                        .body(resource);

            } catch (IOException e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
            }
        });
    }
}
