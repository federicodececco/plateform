package com.plateform.restfinder.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.plateform.restfinder.model.Place;

@Repository
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

    List<Place> findPlacesByProvinceEquals(String province);

    @Query(value = """
            SELECT DISTINCT p.*,
                   CASE
                       WHEN MATCH(p.name) AGAINST(?1 IN BOOLEAN MODE) THEN 3
                       WHEN LOWER(p.name) LIKE LOWER(CONCAT(?1, '%')) THEN 2
                       WHEN LOWER(p.name) LIKE LOWER(CONCAT('%', ?1, '%')) THEN 1
                       ELSE 0
                   END as search_rank
            FROM places p
            WHERE MATCH(p.name) AGAINST(?1 IN BOOLEAN MODE)
               OR LOWER(p.name) LIKE LOWER(CONCAT(?1, '%'))
               OR LOWER(p.name) LIKE LOWER(CONCAT('%', ?1, '%'))
            ORDER BY search_rank DESC, p.name ASC
            """, countQuery = """
            SELECT COUNT(DISTINCT p.id)
            FROM places p
            WHERE MATCH(p.name) AGAINST(?1 IN BOOLEAN MODE)
               OR LOWER(p.name) LIKE LOWER(CONCAT(?1, '%'))
               OR LOWER(p.name) LIKE LOWER(CONCAT('%', ?1, '%'))
            """, nativeQuery = true)
    Page<Place> searchWithRanking(String searchTerm, Pageable pageable);
}
