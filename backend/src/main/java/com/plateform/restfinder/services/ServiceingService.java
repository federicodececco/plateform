package com.plateform.restfinder.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;

import com.plateform.restfinder.model.Serviceing;
import org.springframework.stereotype.Service;
import com.plateform.restfinder.repository.ServiceingRepository;

@Service
public class ServiceingService {

    @Autowired
    ServiceingRepository serviceRepository;

    public List<Serviceing> findAll() {
        return serviceRepository.findAll();
    }

    public Optional<Serviceing> findById(Integer id) {
        return serviceRepository.findById(id);

    }

    public Serviceing create(Serviceing service) {
        return serviceRepository.save(service);
    }

    public Serviceing edit(Serviceing service) {
        return serviceRepository.save(service);
    }

    public void deleteByID(Integer id) {
        serviceRepository.deleteById(id);
    }

}
