import { Link } from 'react-router-dom';
import styles from './RegionCard.module.css';
import { useTranslation } from 'react-i18next';

const RegionCard = ({ regionName, description, restaurantCount }) => {
    const { t } = useTranslation();
    return (
        <div className={styles["region-card"]}>
            <div className={styles["card-image-placeholder"]}>
                {regionName}
            </div>
            <div className={styles["card-content"]}>
                <h3 className={styles["card-title"]}>{regionName}</h3>
                <p className={styles["card-description"]}>{description}</p>
                <Link
                    to={`/search/${regionName}`}>
                    link
                </Link>
            </div>
        </div>
    );
};

export default RegionCard;