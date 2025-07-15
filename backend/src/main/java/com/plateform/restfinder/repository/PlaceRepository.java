package com.plateform.restfinder.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.plateform.restfinder.model.Place;

public interface PlaceRepository extends JpaRepository<Place, String> {

    @Query(value = """
            SELECT * FROM places p
            WHERE ST_Distance_Sphere(
                POINT(:longitude, :latitude),
                POINT(p.longitude, p.latitude)
            ) <= :radiusMeters
            ORDER BY ST_Distance_Sphere(
                POINT(:longitude, :latitude),
                POINT(p.longitude, p.latitude)
            )
            """, nativeQuery = true)
    List<Place> findPlacesWithinRadius(
            @Param("latitude") Double latitude,
            @Param("longitude") Double longitude,
            @Param("radiusMeters") Double radiusMeters);

}
