import styles from './ReviewCard.module.css';
import { useGlobalContext } from '../context/GlobalContext';

export default function ReviewCard({ reviewerName, reviewDate, rating, reviewText }) {
    const { renderStars } = useGlobalContext()
    return (
        <div className={styles.reviewCard}>
            <div className={styles.reviewCardHeader}>
                <span className={styles.reviewerName}>{reviewerName}</span>
                <span className={styles.reviewDate}>{reviewDate}</span>
            </div>
            <div className={styles.reviewStars}>{renderStars(rating)}</div>
            <p className={styles.reviewText}>{reviewText}</p>
        </div>
    )
}