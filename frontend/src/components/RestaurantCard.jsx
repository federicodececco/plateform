import React from 'react';
import styles from './RestaurantCard.module.css';
import { useGlobalContext } from '../context/GlobalContext';

const RestaurantCard = ({ restaurant }) => {
    const {
        name,
        mainCategory,
        coverImageName = 'false',
        address,
        adressNumber,
        city,
        cap,
        province,
        description, //non è presente
        tags, //non è presente
        price,
        rating,
        reviewNumber,
        actionText, //non è presente
        actionType, // e.g., 'book' or 'details' to determine button color/style
        blacklist, // stabilisce se è visibile o meno
    } = restaurant;

    const { renderStars, renderPrice } = useGlobalContext()

    if (blacklist) {
        return null
    }

    return (
        <div className={styles["restaurant-card"]}>
            {coverImageName ? <div className={styles["restaurant-image-placeholder"]}>
                <span className={styles["image-text"]}>Ristorante</span>
            </div> : <img src={coverImageName} />}
            <div className={styles["restaurant-details"]}>
                <div className={styles["restaurant-header"]}>
                    <h3 className={styles["restaurant-name"]}>{name}</h3>
                    <div className={styles["restaurant-rating"]}>
                        {renderStars(rating)}
                        <span className={styles["rating-value"]}>({rating})</span>
                    </div>
                </div>
                <p className={styles["restaurant-location"]}>
                    <span className={styles["location-icon"]}>📍</span> {address}, {adressNumber} - {cap} {city} {province}
                </p>
                <div className={styles["restaurant-tags"]}>
                    {tags.map((tag, index) => (
                        <span key={index} className={styles[`tag tag-${tag.toLowerCase().replace(/\s/g, '-')}`]}>
                            {tag}
                        </span>
                    ))}
                </div>
                <div className={styles["restaurant-footer"]}>
                    <span className={styles["restaurant-price"]}>{renderPrice(price)}</span>
                    <button className={styles[`action-button action-button-${actionType}`]}>
                        {actionText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RestaurantCard;