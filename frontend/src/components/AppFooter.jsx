import styles from './AppFooter.module.css';
import { useTranslation } from 'react-i18next';
import { FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa'; // Importa le icone necessarie

const featuredRegions = [
    { name: 'Lombardia', slug: 'lombardia' },
    { name: 'Piemonte', slug: 'piemonte' },
    { name: 'Toscana', slug: 'toscana' },
    { name: 'Lazio', slug: 'lazio' },
];

export default function AppFooter() {
    const { t } = useTranslation();

    return (
        <footer className={styles["footer"]}>
            <div className={styles["footer-content"]}>
                <div className={styles["footer-column"]}>
                    <div className={styles["footer-logo"]}>
                        <a href="/">Ristorant.it</a>
                    </div>
                    <p className={styles["footer-description"]}>{t('footerDescription')}</p>
                </div>
                <div className={styles["footer-column"]}>
                    <h3 className={styles["footer-heading"]}>{t('contacts')}</h3>
                    <ul className={styles["footer-contact"]}>
                        <li>
                            <a
                                href={'https://plateform.app/'}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Plateform
                            </a>
                        </li>
                        <li>Via Andrea Costa, 202/6, Bologna, Emilia-Romagna 40134, IT</li>
                    </ul>
                </div>
                <div className={styles["footer-column"]}>
                    <h3 className={styles["footer-heading"]}>{t('regions')}</h3>
                    <ul className={styles["footer-links"]}>
                        {featuredRegions.map(region => (
                            <li key={region.slug}>
                                <a href={`/search/${region.slug}`}>{t(region.slug)}</a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className={styles["footer-bottom"]}>
                <p>{t('copyright')}</p>
                <div className={styles["footer-social"]}>
                    <a href="https://www.facebook.com/plateform.official" aria-label="Facebook">
                        <FaFacebookF size={24} />
                    </a>
                    <a href="https://www.instagram.com/plateform.official/" aria-label="Instagram">
                        <FaInstagram size={24} />
                    </a>
                    <a href="https://www.linkedin.com/company/plateformapp/" aria-label="Linkedin">
                        <FaLinkedinIn size={24} />
                    </a>
                </div>
            </div>
        </footer>
    );
}
