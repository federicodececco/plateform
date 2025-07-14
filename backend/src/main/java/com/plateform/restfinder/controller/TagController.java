package com.plateform.restfinder.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.plateform.restfinder.model.Tag;
import com.plateform.restfinder.services.TagService;

import reactor.core.publisher.Mono;

import java.nio.file.Path;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api/tags")
public class TagController {

    @Autowired
    TagService tagService;

    @GetMapping("/")
    public Mono<List<Tag>> index() {
        return Mono.just(tagService.findAll());
    }

    @GetMapping("/{id}")
    public Mono<ResponseEntity<Tag>> getById(@PathVariable Integer id) {
        try {
            Optional<Tag> optTag = tagService.findById(id);
            if (optTag.isEmpty()) {
                return Mono.just(new ResponseEntity<>(HttpStatus.NOT_FOUND));
            }
            return Mono.just(new ResponseEntity<>(optTag.get(), HttpStatus.OK));
        } catch (Exception e) {
            System.err.println(e.getMessage());
            return Mono.just(new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR));
        }
    }

    @GetMapping("/google/{googleName}")
    public Mono<ResponseEntity<Tag>> getByGoogleName(@PathVariable String googleName) {
        try {
            Optional<Tag> optTag = tagService.findByGLName(googleName);
            if (optTag.isEmpty()) {
                return Mono.just(new ResponseEntity<>(HttpStatus.NOT_FOUND));
            }
            return Mono.just(new ResponseEntity<>(optTag.get(), HttpStatus.OK));
        } catch (Exception e) {
            System.err.println(e.getMessage());
            return Mono.just(new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR));
        }
    }

    @PostMapping("/create")
    public ResponseEntity<Tag> create() {
        return new ResponseEntity<>(null);
    }

    @PostMapping("/edit")
    public String postMethodName(@RequestBody String entity) {

        return entity;
    }

    @PostMapping("/delete/{id}")
    public ResponseEntity<Tag> deleteById(@PathVariable Integer id) {
        try {

            if (!tagService.findById(id).isEmpty()) {
                tagService.delete(id);
                new ResponseEntity<>(HttpStatus.OK);
            }

            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        } catch (Exception e) {
            System.err.print(e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

}
