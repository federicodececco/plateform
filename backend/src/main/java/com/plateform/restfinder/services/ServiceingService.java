package com.plateform.restfinder.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;

import com.plateform.restfinder.model.Tags;
import org.springframework.stereotype.Service;
import com.plateform.restfinder.repository.TagsRepository;

@Service
public class ServiceingService {

    @Autowired
    TagsRepository tagsRepository;

    public List<Tags> findAll() {
        return tagsRepository.findAll();
    }

    public Optional<Tags> findById(Integer id) {
        return tagsRepository.findById(id);

    }

    public Tags create(Tags service) {
        return tagsRepository.save(service);
    }

    public Tags edit(Tags service) {
        return tagsRepository.save(service);
    }

    public void deleteByID(Integer id) {
        tagsRepository.deleteById(id);
    }

}
