import styles from './AppFooter.module.css';
import { useTranslation } from 'react-i18next';

export default function AppFooter() {
    const { t } = useTranslation();
    return (
        <footer className={styles["footer"]}>
            <div className={styles["footer-content"]}>
                <div className={styles["footer-column"]}>
                    <div className={styles["footer-logo"]}>
                        <a href="/home">Ristorant.it</a>
                    </div>
                    <p className={styles["footer-description"]}>{t('footerDescription')}</p>
                </div>
                <div className={styles["footer-column"]}>
                    <h3 className={styles["footer-heading"]}>{t('regions')}</h3>
                    <ul className={styles["footer-links"]}>
                        <li><a href="/regioni/campania">{t('campania')}</a></li>
                        <li><a href="/regioni/liguria">{t('liguria')}</a></li>
                        <li><a href="/regioni/toscana">{t('toscana')}</a></li>
                        <li><a href="/regioni/sicilia">{t('sicilia')}</a></li>
                    </ul>
                </div>

                <div className={styles["footer-column"]}>
                    <h3 className={styles["footer-heading"]}>{t('services')}</h3>
                    <ul className={styles["footer-links"]}>
                        <li><a href="/prenotazioni">{t('reservations')}</a></li>
                        <li><a href="/recensioni">{t('reviews')}</a></li>
                        <li><a href="/guide">{t('guides')}</a></li>
                        <li><a href="/blog">{t('blog')}</a></li>
                    </ul>
                </div>

                <div className={styles["footer-column"]}>
                    <h3 className={styles["footer-heading"]}>{t('contacts')}</h3>
                    <ul className={styles["footer-contact"]}>
                        <li><a href="mailto:info@ristocosa.it">info@ristocosa.it</a></li>
                        <li><a href="tel:+394441234567">+39 444 123 4567</a></li>
                        <li>{t('address')}</li>
                        <li>{t('postalCodeCity')}</li>
                    </ul>
                </div>
            </div>

            <div className={styles["footer-bottom"]}>
                <p>{t('copyright')}</p>
                <div className={styles["footer-social"]}>
                    <a href="#" aria-label="Facebook"><img src="/path/to/facebook-icon.svg" alt="Facebook" /></a>
                    <a href="#" aria-label="Instagram"><img src="/path/to/instagram-icon.svg" alt="Instagram" /></a>
                    <a href="#" aria-label="Twitter"><img src="/path/to/twitter-icon.svg" alt="Twitter" /></a>
                </div>
            </div>
        </footer>
    );
}