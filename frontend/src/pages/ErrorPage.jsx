// import styles from './styles/ErrorPage.module.css'; 
import styles from './ErrorPage.module.css';
import { useTranslation } from 'react-i18next';

const ErrorPage = () => {
    const { t } = useTranslation();
    return (
        <div className={styles["error-page-container"]}>
            <div className={styles["error-content"]}>
                <h1 className={styles["error-code"]}>404</h1>
                <h2 className={styles["error-title"]}>{t('errorTitle')}</h2>
                <p className={styles["error-description"]}>
                    {t('errorDescription')}
                </p>
                <a href="/" className={styles["error-home-button"]}>{t('errorHomeButton')}</a>
                <p className={styles["error-contact-suggestion"]}>
                    {t('errorContactSuggestion')}
                </p>
            </div>
        </div>
    );
};

export default ErrorPage;