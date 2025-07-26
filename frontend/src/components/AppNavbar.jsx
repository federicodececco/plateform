import { useGlobalContext } from '../context/GlobalContext';
import styles from './AppNavbar.module.css';
import { useCallback, useState } from 'react';
import debounce from 'lodash/debounce';
import { useTranslation } from 'react-i18next';
import { FaBars } from 'react-icons/fa';
import { useAuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function AppNavbar() {

    const [hamburgerMenuOpen, setHamburgerMenuOpen] = useState(false);
    const { showLanguageOptions, setShowLanguageOptions, closeShowLanguageOptions } = useGlobalContext();
    const { i18n, t } = useTranslation();
    const [navSearchBar, setNavSearchBar] = useState('')
    const navigate = useNavigate();
    const { logout, isAuthenticated } = useAuthContext();
    // passare la chiamata api dentro la callback del debounce
    const handleDebouncedSearch = useCallback(
        debounce(() => { navigate(`/search?name=${navSearchBar}`) }, 300)
        , [navSearchBar])

    const handleEnterUp = e => {
        if (e.key === 'Enter') {
            // effettuare la chiamata api qui
            handleDebouncedSearch();
            setNavSearchBar('')
        }
    }

    const handleSearchClick = e => {
        // effettuare la chiamata api qui
        handleDebouncedSearch();
        setNavSearchBar('')
    }

    return (
        <nav className={styles["navbar"]}>
            <div className={styles.navContainer}>

                <div className={styles["navbar-logo"]}>
                    <a href="/">RestFinder.it</a>
                </div>
                <button onClick={() => logout()}>logout</button>
                <ul className={styles["navbar-links"]}>
                    {isAuthenticated() && <li><a href="/addplaces">{t('add')} {t('place')}</a></li>}
                    <li><a href="/login">Login</a></li>
                    <li><a href="/search">{t('search')}</a></li>
                    <li>
                        <button onClick={() => setShowLanguageOptions(prev => !prev)}>
                            <img src={i18n.language === 'it' ? "https://flagicons.lipis.dev/flags/4x3/it.svg" : "https://flagicons.lipis.dev/flags/4x3/gb.svg"}
                                alt={i18n.language === 'it' ? "Bandiera Italiana" : "Bandiera Inglese"} />
                        </button>
                        {showLanguageOptions && (
                            <div className={styles.languageOptions}>
                                <button onClick={() => i18n.changeLanguage('it')}>
                                    <img src="https://flagicons.lipis.dev/flags/4x3/it.svg" alt="Bandiera Italiana" />
                                    <span>{t('languageItalian')}</span></button>
                                <button onClick={() => i18n.changeLanguage('en')}>
                                    <img src="https://flagicons.lipis.dev/flags/4x3/gb.svg" alt="Bandiera Britannica" />
                                    <span>{t('languageEnglish')}</span></button>
                            </div>
                        )}
                    </li>
                </ul>
                <div
                    className={styles.hamburgerMenu}
                    onClick={() => setHamburgerMenuOpen(prev => !prev)}
                >
                    <FaBars />
                </div>
                {/* Overlay*/}
                {hamburgerMenuOpen && (
                    <div className={`${styles.overlay} ${styles.active}`} onClick={() => setHamburgerMenuOpen(false)}></div>
                )}
                <ul className={`${styles["hamburgerLinks"]} ${hamburgerMenuOpen ? styles.open : ''}`}>
                    {isAuthenticated() && <li><a href="/addplaces">{t('add')} {t('place')}</a></li>}
                    <li><a href="/login">Login</a></li>
                    <li><a href="/search">{t('search')}</a></li>
                    <li>
                        <span>{t("selectLanguage")}</span>
                        <div className={styles.languageButtons}>
                            <button onClick={() => i18n.changeLanguage('it')}>
                                <img src="https://flagicons.lipis.dev/flags/4x3/it.svg" alt="Bandiera Italiana" />
                                <span>Italiano</span></button>
                            <button onClick={() => i18n.changeLanguage('en')}>
                                <img src="https://flagicons.lipis.dev/flags/4x3/gb.svg" alt="Bandiera Britannica" />
                                <span>Inglese</span></button>
                        </div>
                    </li>
                </ul>
            </div>

            <div className={styles["navbar-search"]}>
                <input type="text" placeholder={t('searchByLocationPlaceholder')} value={navSearchBar} onKeyUp={handleEnterUp} onChange={e => setNavSearchBar(e.target.value)} />
                <button type="submit" aria-label="Cerca" onClick={handleSearchClick}>
                    <svg className={styles["search-icon"]} viewBox="0 0 24 24" fill="currentColor">
                        <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                    </svg>
                </button>
            </div>
        </nav>
    );
}