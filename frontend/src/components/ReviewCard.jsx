import styles from './ReviewCard.module.css';
import { useGlobalContext } from '../context/GlobalContext';

export default function ReviewCard({ review }) {
    const { renderStars } = useGlobalContext()
    return (
        <div className={styles.reviewCard}>
            <div className={styles.reviewCardHeader}>
                <span className={styles.reviewerName}>Marco R.</span>
                <span className={styles.reviewDate}>15 gennaio 2025</span>
            </div>
            <div className={styles.reviewStars}>{renderStars(5)}</div>
            <p className={styles.reviewText}>
                Esperienza fantastica! Il pesce era freschissimo e la vista dalla terrazza mozzafiato. Servizio impeccabile e atmosfera molto accogliente. Torneremo sicuramente!
            </p>
        </div>
    )
}