// RegionCard.jsx
import styles from './RegionCard.module.css'; // Importa gli stili specifici della card

const RegionCard = ({ regionName, description, restaurantCount }) => {
    return (
        <div className={styles["region-card"]}>
            <div className={styles["card-image-placeholder"]}>
                {regionName}
            </div>
            <div className={styles["card-content"]}>
                <h3 className={styles["card-title"]}>{regionName}</h3>
                <p className={styles["card-description"]}>{description}</p>
                <span className={styles["restaurant-count"]}>{restaurantCount} ristoranti</span>
            </div>
        </div>
    );
};

export default RegionCard;