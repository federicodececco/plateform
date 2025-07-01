import { useCallback, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
// import './HomePage.css';
import styles from './HomePage.module.css';
import { useGlobalContext } from '../context/GlobalContext';

export default function HomePage() {
    const { fruits, allCategory, getSingleFruit, deleteFruits, addFruits } = useGlobalContext()

    return (
        <div className={styles["hero-search-section-container"]}>
            {/* Intestazione */}
            <h1 className={styles["hero-title"]}>Trova il Ristorante Perfetto</h1>
            <p className={styles["hero-description"]}>Scopri i migliori ristoranti d'Italia. Prenota il tuo tavolo e vivi un'esperienza culinaria indimenticabile.</p>

            {/* Box di ricerca */}
            <div className={styles["search-box"]}>
                <div className={styles["search-field"]}>
                    <label htmlFor="location">Dove</label>
                    <div className={styles["input-with-icon"]}>
                        <input type="text" id="location" placeholder="Città o regione..." />
                        <span className={styles["icon"]}>📍</span>
                    </div>
                </div>

                <div className={styles["search-field"]}>
                    <label htmlFor="date">Data</label>
                    <div className={styles["input-with-icon"]}>
                        <input type="text" id="date" placeholder="gg/mm/aaaa" />
                        <span className={styles["icon"]}>🗓️</span>
                    </div>
                </div>

                <div className={styles["search-field"]}>
                    <label htmlFor="people">Persone</label>
                    <div className={styles["custom-select"]}>
                        <select id="people" defaultValue="2">
                            <option value="1">1 persona</option>
                            <option value="2">2 persone</option>
                            <option value="3">3 persone</option>
                            <option value="4">4 persone</option>
                            <option value="5">5 persone</option>
                            <option value="6">6 persone</option>
                            <option value="7">7 persone</option>
                            <option value="8">8 persone</option>
                            <option value="9">9 persone</option>
                            <option value="10">10+ persone</option>
                        </select>
                        <span className={styles["select-arrow"]}></span>
                    </div>
                </div>

                <button className={styles["search-restaurants-button"]}>Cerca Ristoranti</button>
            </div>
        </div>
    );
};
