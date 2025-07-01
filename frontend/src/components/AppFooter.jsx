import styles from './AppFooter.module.css';

export default function AppFooter() {
    return (
        <footer className={styles["footer"]}>
            <div className={styles["footer-content"]}>
                <div className={styles["footer-column"]}>
                    <div className={styles["footer-logo"]}>
                        <a href="/">Ristorant.it</a>
                    </div>
                    <p className={styles["footer-description"]}>La tua guida completa per i migliori ristoranti d'Italia.</p>
                </div>
                <div className={styles["footer-column"]}>
                    <h3 className={styles["footer-heading"]}>Regioni</h3>
                    <ul className={styles["footer-links"]}>
                        <li><a href="/regioni/campania">Campania</a></li>
                        <li><a href="/regioni/liguria">Liguria</a></li>
                        <li><a href="/regioni/toscana">Toscana</a></li>
                        <li><a href="/regioni/sicilia">Sicilia</a></li>
                    </ul>
                </div>

                <div className={styles["footer-column"]}>
                    <h3 className={styles["footer-heading"]}>Servizi</h3>
                    <ul className={styles["footer-links"]}>
                        <li><a href="/prenotazioni">Prenotazioni</a></li>
                        <li><a href="/recensioni">Recensioni</a></li>
                        <li><a href="/guide">Guide</a></li>
                        <li><a href="/blog">Blog</a></li>
                    </ul>
                </div>

                <div className={styles["footer-column"]}>
                    <h3 className={styles["footer-heading"]}>Contatti</h3>
                    <ul className={styles["footer-contact"]}>
                        <li><a href="mailto:info@ristocosa.it">info@ristocosa.it</a></li>
                        <li><a href="tel:+394441234567">+39 444 123 4567</a></li>
                        <li>Via del Mare, 123</li>
                        <li>80100 sss</li>
                    </ul>
                </div>
            </div>

            <div className={styles["footer-bottom"]}>
                <p>&copy; 2025 ristorisportali.it. Tutti i diritti riservati.</p>
                <div className={styles["footer-social"]}>
                    <a href="#" aria-label="Facebook"><img src="/path/to/facebook-icon.svg" alt="Facebook" /></a> {/* Sostituisci con le tue icone SVG o font awesome */}
                    <a href="#" aria-label="Instagram"><img src="/path/to/instagram-icon.svg" alt="Instagram" /></a>
                    <a href="#" aria-label="Twitter"><img src="/path/to/twitter-icon.svg" alt="Twitter" /></a>
                </div>
            </div>
        </footer>
    );
}