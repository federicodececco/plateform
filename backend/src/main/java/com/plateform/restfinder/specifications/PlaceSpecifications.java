package com.plateform.restfinder.specifications;

import java.util.List;

import org.springframework.data.jpa.domain.Specification;
import com.plateform.restfinder.model.Place;
import com.plateform.restfinder.model.Tag;

import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.JoinType;

import com.plateform.restfinder.model.Category;

public class PlaceSpecifications {

    public static Specification<Place> hasCategory(String category) {
        return (root, query, criteriaBuilder) -> {
            if (category == null || category.trim().isEmpty()) {
                return criteriaBuilder.conjunction();
            }

            query.distinct(true);

            Join<Place, Category> categoryJoin = root.join("categories", JoinType.INNER);

            return criteriaBuilder.equal(
                    criteriaBuilder.lower(categoryJoin.get("googleName")),
                    category.toLowerCase());
        };
    }

    public static Specification<Place> hasTags(List<String> tags) {
        return (root, query, criteriaBuilder) -> {
            if (tags == null || tags.isEmpty()) {
                return criteriaBuilder.conjunction();
            }

            query.distinct(true);

            List<String> lowerTags = tags.stream()
                    .map(String::toLowerCase)
                    .toList();

            Join<Place, Tag> tagJoin = root.join("tags", JoinType.INNER);

            return criteriaBuilder.lower(tagJoin.get("googleName")).in(lowerTags);
        };
    }

    public static Specification<Place> hasPriceRange(String priceRange) {
        return (root, query, criteriaBuilder) -> {
            if (priceRange == null || priceRange.trim().isEmpty()) {
                return criteriaBuilder.conjunction();
            }
            return criteriaBuilder.equal(root.get("priceRange"), priceRange);
        };
    }

    public static Specification<Place> hasMinRating(Integer rating) {
        return (root, query, criteriaBuilder) -> {
            if (rating == null) {
                return criteriaBuilder.conjunction();
            }
            return criteriaBuilder.greaterThanOrEqualTo(root.get("rating"), rating.doubleValue());
        };
    }

    public static Specification<Place> notBlacklisted() {
        return (root, query, criteriaBuilder) -> criteriaBuilder.or(
                criteriaBuilder.isFalse(root.get("blacklist")),
                criteriaBuilder.isNull(root.get("blacklist")));
    }

    public static Specification<Place> buildFilterSpecification(
            String category, List<String> tags, String priceRange, Integer rating) {

        return Specification.where(notBlacklisted())
                .and(hasCategory(category))
                .and(hasTags(tags))
                .and(hasPriceRange(priceRange))
                .and(hasMinRating(rating));
    }
}
