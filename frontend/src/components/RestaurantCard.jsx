import React from 'react';
import styles from './RestaurantCard.module.css';
import { useGlobalContext } from '../context/GlobalContext';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const RestaurantCard = ({ restaurant }) => {

    const { i18n } = useTranslation();

    const {
        address,
        adressNumber,
        blacklist,
        cap,
        categories, //arr
        city,
        coverImageName,
        googleMapsURL,
        id,
        isEdited,
        latitude,
        longitude,
        mainCategory,
        name,
        nation,
        phoneNumber,
        photos, //arr
        plateformID,
        plateformURL,
        priceRange,
        province,
        rating,
        region,
        reviewNumber,
        slugName,
        tags, //arr enName itName googleName id isVisible
        webSiteURL
    } = restaurant;

    const { renderStars, renderPrice } = useGlobalContext()

    if (blacklist) {
        return null
    }

    // return null
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
                        // <span key={index} className={styles[`tag tag-${tag.googleName.toLowerCase().replace(/\s/g, '-')}`]}>
                        <span key={index} className={`${styles.tag} ${styles[`tag-${tag.googleName}`]} ${!tag.isVisible ? styles.hidden : ''}`}>
                            {/* <span key={index} className={styles["tag", (!tag.isVisible) ? 'hidden' : '']}> */}
                            {i18n.language === 'it' ? `${tag.itName}` : `${tag.enName}`}
                        </span>
                    ))}
                </div>
                <div className={styles["restaurant-footer"]}>
                    <span className={styles["restaurant-price"]}>{renderPrice(priceRange)}</span>

                    <Link
                        to={`/detail/${id}`}
                        className={`${styles["detail-button"]} ${styles[`detail-button-${(plateformID !== '') ? 'prenota' : 'visualizza'}`]}`}>
                        {(plateformID !== '') ? 'Prenota' : 'Visualizza'}
                    </Link>
                </div>
            </div>
        </div >
    );
};

export default RestaurantCard;