import React from 'react';
import styles from './RestaurantCard.module.css';
import { useGlobalContext } from '../context/GlobalContext';
import { useTranslation } from 'react-i18next';

const RestaurantCard = ({ restaurant }) => {

    const { i18n } = useTranslation();
    console.log(i18n.language, 'lingua corrente');


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

    // console.log('restaurant', restaurant[0]);
    console.log('tags', tags[0]);


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
                        <span key={index} className={styles[`tag tag-${tag.googleName} ${!tag.isVisible && 'hidden'}`]}>
                            {i18n.language === 'it' ? `${tag.itName}` : `${tag.enName}`}
                        </span>
                    ))}
                </div>
                <div className={styles["restaurant-footer"]}>
                    <span className={styles["restaurant-price"]}>{renderPrice(priceRange)}</span>
                    <button className={styles[`action-button action-button-${plateformID ? 'prenota' : 'visualizza'}`]}>
                        {plateformID ? 'Prenota' : 'Visualizza'}
                    </button>
                </div>
            </div>
        </div >
    );
};

export default RestaurantCard;