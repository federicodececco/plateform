package com.plateform.restfinder.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.plateform.restfinder.model.Place;

import jakarta.transaction.Transactional;

@Repository
public interface PlaceRepository extends JpaRepository<Place, String>, JpaSpecificationExecutor<Place> {
        // ricerca per raggio attraverso st distance sphere
        @Query(value = """
                        SELECT * FROM places p
                        WHERE p.blacklist = false
                        AND ST_Distance_Sphere(
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

        @Query("SELECT p FROM Place p WHERE p.province = :province AND p.blacklist = false")
        @EntityGraph(attributePaths = { "categories", "tags", "photos" })
        @Transactional
        List<Place> findPlacesByProvinceEqualsNotBlacklisted(@Param("province") String province);

        @Query("SELECT p FROM Place p WHERE p.region = :region AND p.blacklist = false")
        @EntityGraph(attributePaths = { "categories", "tags", "photos" })
        @Transactional
        List<Place> findPlacesByRegionEqualsNotBlacklisted(@Param("region") String region);

        @Query(value = """
                        SELECT DISTINCT p.*,
                               CASE
                                   WHEN MATCH(p.name) AGAINST(?1 IN BOOLEAN MODE) THEN 3
                                   WHEN LOWER(p.name) LIKE LOWER(CONCAT(?1, '%')) THEN 2
                                   WHEN LOWER(p.name) LIKE LOWER(CONCAT('%', ?1, '%')) THEN 1
                                   ELSE 0
                               END as search_rank
                        FROM places p
                        WHERE p.blacklist = false
                        AND MATCH(p.name) AGAINST(?1 IN BOOLEAN MODE)
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

        @Query("UPDATE Place p SET p.blacklist = true WHERE p.id = :id")
        @Modifying
        @Transactional
        int softDeleteById(@Param("id") String id);

        @Query("SELECT p FROM Place p " +
                        "LEFT JOIN FETCH p.categories " +
                        "LEFT JOIN FETCH p.tags " +
                        "LEFT JOIN FETCH p.photos " +
                        "WHERE p.id = :id")
        Optional<Place> findByIdRelations(@Param("id") String id);

        @EntityGraph(attributePaths = { "categories", "tags", "photos" })
        @Transactional
        Page<Place> findAll(Specification<Place> spec, Pageable pageable);

        @Query("SELECT DISTINCT p FROM Place p " +
                        "LEFT JOIN FETCH p.categories " +
                        "LEFT JOIN FETCH p.tags " +
                        "LEFT JOIN FETCH p.photos " +
                        "WHERE p.id IN :ids")
        List<Place> findByIdInWithRelations(@Param("ids") List<String> ids);

}
