package com.plateform.restfinder.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.plateform.restfinder.model.Category;
import com.plateform.restfinder.services.CategoryService;

import reactor.core.publisher.Mono;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/categories")
public class CategoryController {

    @Autowired
    CategoryService categoryService;

    @GetMapping("/")
    public Mono<List<Category>> getCategoris() {
        return Mono.just(categoryService.findAll());
    }

    @GetMapping("/{id}")
    public Mono<ResponseEntity<Category>> findById(@PathVariable Integer id) {

        try {
            Optional<Category> optCat = categoryService.findById(id);
            if (optCat.isEmpty()) {
                return Mono.just(new ResponseEntity<>(HttpStatus.NOT_FOUND));
            }
            return Mono.just(new ResponseEntity<Category>(optCat.get(), HttpStatus.OK));
        } catch (Exception e) {
            System.err.print(e);
            return Mono.just(new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR));
        }
    }

    @PostMapping("/create")
    public Mono<ResponseEntity<Category>> create(@RequestBody Category category) {
        try {
            return Mono.just(new ResponseEntity<Category>(categoryService.save(category), HttpStatus.OK));

        } catch (Exception e) {
            System.err.print(e);
            return Mono.just(new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR));
        }
    }

    @PostMapping("/edit/{id}")
    public Mono<ResponseEntity<Category>> edit(@PathVariable Integer id, @RequestBody Category category) {
        try {
            category.setId(id);
            return Mono.just(new ResponseEntity<Category>(categoryService.save(category), HttpStatus.OK));
        } catch (Exception e) {
            System.err.print(e);
            return Mono.just(new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR));
        }
    }

    @DeleteMapping("/delete/{id}")
    public Mono<ResponseEntity<Category>> delete(@PathVariable Integer id) {
        try {
            if (categoryService.findById(id).isPresent()) {
                categoryService.deleteById(id);
                return Mono.just(new ResponseEntity<>(HttpStatus.OK));
            }
            return Mono.just(new ResponseEntity<>(HttpStatus.NOT_FOUND));
        } catch (Exception e) {
            System.err.print(e);
            return Mono.just(new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR));
        }
    }

}
