// import styles from './styles/ErrorPage.module.css'; 
import styles from './ErrorPage.module.css';

const ErrorPage = () => {
    return (
        <div className={styles["error-page-container"]}>
            <div className={styles["error-content"]}>
                <h1 className={styles["error-code"]}>404</h1>
                <h2 className={styles["error-title"]}>Ops! Pagina Non Trovata</h2>
                <p className={styles["error-description"]}>
                    Sembra che tu abbia preso una strada sbagliata. La pagina che stai cercando potrebbe non esistere
                    o essere stata spostata.
                </p>
                <a href="/" className={styles["error-home-button"]}>Torna alla Home Page</a>
                <p className={styles["error-contact-suggestion"]}>
                    Se pensi ci sia un errore, <a href="/contatti" className={styles["error-contact-link"]}>contattaci</a>.
                </p>
            </div>
        </div>
    );
};

export default ErrorPage;