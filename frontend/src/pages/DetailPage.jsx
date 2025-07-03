import React, { useState } from 'react';
import { useGlobalContext } from '../context/GlobalContext';
import styles from './DetailPage.module.css';
import ReviewCard from '../components/ReviewCard';
import {
    FaWifi,
    FaParking,
    FaCreditCard,
    FaWheelchair,
    FaWineGlassAlt,
    FaPhoneAlt,
    FaEnvelope,
    FaGlobe,
    FaFacebookF,
    FaInstagram,
    FaTripadvisor
} from 'react-icons/fa'; // Assicurati di aver installato 'react-icons'

const reviewsData = [
    {
        reviewerName: "Marco R.",
        reviewDate: "15 gennaio 2025",
        rating: 5,
        reviewText: "Esperienza fantastica! Il pesce era freschissimo e la vista dalla terrazza mozzafiato. Servizio impeccabile e atmosfera molto accogliente. Torneremo sicuramente!"
    },
    {
        reviewerName: "Giulia M.",
        reviewDate: "12 gennaio 2025",
        rating: 4,
        reviewText: "Ottimo ristorante di pesce nel centro di Napoli. Piatti tradizionali preparati con cura e ingredienti di qualità. Prezzo giusto per la qualità offerta."
    }
];

export default function DetailPage() {
    const { renderStars } = useGlobalContext()
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('19:30');
    const [selectedPeople, setSelectedPeople] = useState('2 persone');



    const handleSubmitBooking = (e) => {
        e.preventDefault();
        alert(`Prenotazione per il ${selectedDate} alle ${selectedTime} per ${selectedPeople}.`);
        console.log('Dettagli prenotazione:', { selectedDate, selectedTime, selectedPeople });
    };

    return (
        <div className={styles.pageContainer}>
            <section className={styles.upperSection}>
                {/* Sezione Sinistra: Dettagli Ristorante e Galleria (Parte precedente) */}
                <div className={styles.leftSection}>
                    <div className={styles.gallery}>
                        <div className={styles.mainPhoto}>Foto Principale</div>
                        <div className={styles.thumbnailPhoto}>Interno</div>
                        <div className={styles.thumbnailPhoto}>Piatti</div>
                        <div className={styles.thumbnailPhoto}>Terrazza</div>
                        <div className={styles.thumbnailPhoto}>+12 foto</div>
                    </div>

                    <div className={styles.tagsContainer}>
                        <span className={styles.tag}>Cucina di Mare</span>
                        <span className={styles.tag}>Terrazza</span>
                        <span className={styles.tag}>Aperto</span>
                    </div>

                    <h1 className={styles.restaurantName}>Osteria del Porto</h1>

                    <div className={styles.rating}>
                        {renderStars(4.8)}
                        <span className={styles.reviewsCount}>4.8 (247 recensioni)</span>
                    </div>

                    <p className={styles.address}>Via del Porto, 15 - 80133 Napoli (NA)</p>
                </div>

                {/* Sezione Destra: Modulo di Prenotazione*/}
                <div className={styles.rightSection}>
                    <h3 className={styles.bookingTitle}>Prenota un Tavolo</h3>

                    <form onSubmit={handleSubmitBooking}>
                        <div className={styles.formGroup}>
                            <label htmlFor="bookingDate" className={styles.formLabel}>Data</label>
                            <input
                                type="text"
                                id="bookingDate"
                                className={`${styles.formInput} ${styles.dateInput}`}
                                placeholder="gg/mm/aaaa"
                                value={selectedDate}
                                onChange={(e) => setSelectedDate(e.target.value)}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="bookingTime" className={styles.formLabel}>Orario</label>
                            <select
                                id="bookingTime"
                                className={styles.formSelect}
                                value={selectedTime}
                                onChange={(e) => setSelectedTime(e.target.value)}
                            >
                                <option value="19:30">19:30</option>
                                <option value="20:00">20:00</option>
                                <option value="20:30">20:30</option>
                                <option value="21:00">21:00</option>
                            </select>
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="bookingPeople" className={styles.formLabel}>Persone</label>
                            <select
                                id="bookingPeople"
                                className={styles.formSelect}
                                value={selectedPeople}
                                onChange={(e) => setSelectedPeople(e.target.value)}
                            >
                                <option value="1 persona">1 persona</option>
                                <option value="2 persone">2 persone</option>
                                <option value="3 persone">3 persone</option>
                                <option value="4 persone">4 persone</option>
                                <option value="5 persone">5 persone</option>
                                <option value="6 persone">6 persone</option>
                            </select>
                        </div>

                        <button type="submit" className={styles.submitButton}>
                            Prenota Ora
                        </button>
                    </form>

                    <div className={styles.priceInfo}>
                        <span>Prezzo medio</span>
                        <span>€35-50</span>
                    </div>

                    <div className={styles.contactInfo}>
                        <span>Telefono</span>
                        <span className={styles.contactValue}>081 123 4567</span>
                    </div>

                    <div className={styles.contactInfo}>
                        <span>Sito web</span>
                        <a href="http://www.osteriadelporto.it" target="_blank" rel="noopener noreferrer" className={styles.contactValue}>
                            www.osteriadelporto.it
                        </a>
                    </div>
                </div>
            </section>
            <section className={styles.bottomSection}>
                {/* Nuova Sezione: Descrizione, Orari e Servizi */}
                <div className={styles.detailsSection}>
                    <div className={styles.descriptionSection}>
                        <div className={styles.descriptionSectionHeading}>


                            <h2 className={styles.sectionHeading}>Descrizione</h2>
                            <p className={styles.descriptionParagraph}>
                                L'Osteria del Porto è un ristorante di pesce situato nel cuore del centro storico di Napoli, con una magnifica vista sul Golfo. La nostra cucina propone piatti della tradizione napoletana e campana, utilizzando solo pesce fresco del giorno.
                            </p>
                            <p className={styles.descriptionParagraph}>
                                La terrazza panoramica offre un'atmosfera unica per cene romantiche e occasioni speciali, mentre la sala interna mantiene il calore dell'accoglienza napoletana tradizionale.
                            </p>
                        </div>

                        <div className={styles.openingHoursSection}>
                            <h2 className={styles.sectionHeading}>Orari di Apertura</h2>
                            <ul className={styles.openingHoursList}>
                                <li className={styles.openingHourItem}>
                                    <span>Lunedì</span>
                                    <span className={styles.closedLabel}>Chiuso</span>
                                </li>
                                <li className={styles.openingHourItem}>
                                    <span>Martedì - Domenica</span>
                                    <span className={styles.openingTime}>19:00 - 23:30</span>
                                </li>
                                <li className={styles.openingHourItem}>
                                    <span>Sabato - Domenica</span>
                                    <span className={styles.openingTime}>12:30 - 15:00, 19:00 - 23:30</span>
                                </li>
                            </ul>
                        </div>

                        <div className={styles.servicesSection}>
                            <h2 className={styles.sectionHeading}>Servizi</h2>
                            <div className={styles.servicesGrid}>
                                <div className={styles.serviceItem}><FaWifi className={styles.serviceIcon} /> WiFi Gratuito</div>
                                <div className={styles.serviceItem}><FaParking className={styles.serviceIcon} /> Parcheggio</div>
                                <div className={styles.serviceItem}><FaWheelchair className={styles.serviceIcon} /> Accessibile</div>
                                <div className={styles.serviceItem}><FaCreditCard className={styles.serviceIcon} /> Carte di Credito</div>
                                <div className={styles.serviceItem}><FaWineGlassAlt className={styles.serviceIcon} /> Terrazza</div>
                                <div className={styles.serviceItem}><FaWineGlassAlt className={styles.serviceIcon} /> Carta Vini</div> {/* Ho usato WineGlassAlt per l'esempio */}
                            </div>
                        </div>
                    </div>

                    {/* Sezione Destra: Mappa e Contatti */}
                    <div className={styles.mapAndContactSection}>
                        <div className={styles.mapSection}>
                            <h2 className={styles.sectionHeading}>Mappa</h2>
                            <div className={styles.mapContainer}>
                                Mappa Interattiva
                            </div>
                            <a href="https://maps.google.com/?q=Osteria+del+Porto+Napoli" target="_blank" rel="noopener noreferrer" className={styles.getDirectionsButton}>
                                Ottieni indicazioni
                            </a>
                        </div>

                        <div className={styles.contactInfoBlock}>
                            <h2 className={styles.sectionHeading}>Contatti</h2>
                            <div className={styles.contactItem}>
                                <FaPhoneAlt className={styles.contactIcon} />
                                <a href="tel:0811234567" className={styles.contactLink}>081 123 4567</a>
                            </div>
                            <div className={styles.contactItem}>
                                <FaEnvelope className={styles.contactIcon} />
                                <a href="mailto:info@osteriadelporto.it" className={styles.contactLink}>info@osteriadelporto.it</a>
                            </div>
                            <div className={styles.contactItem}>
                                <FaGlobe className={styles.contactIcon} />
                                <a href="http://www.osteriadelporto.it" target="_blank" rel="noopener noreferrer" className={styles.contactLink}>www.osteriadelporto.it</a>
                            </div>
                            <div className={styles.contactItem}>
                                <FaFacebookF className={styles.contactIcon} />
                                <FaInstagram className={styles.contactIcon} />
                                <FaTripadvisor className={styles.contactIcon} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Nuova Sezione: Recensioni */}
                <div className={styles.reviewsSection}>
                    <div className={styles.reviewsHeader}>
                        <h2 className={styles.reviewsCountText}>Recensioni (247)</h2>
                        <button className={styles.writeReviewButton}>Scrivi Recensione</button>
                    </div>

                    <div className={styles.reviewsContent}>
                        <div className={styles.overallRating}>
                            <div className={styles.overallScore}>4.8</div>
                            <div className={styles.overallRatingStars}>{renderStars(4.8, '1.8em')}</div>
                            <div className={styles.overallReviewsCount}>Basato su 247 recensioni</div>
                        </div>

                        <div className={styles.individualReviews}>
                            {reviewsData.map((rev, index) => (
                                <ReviewCard
                                    key={index}
                                    reviewerName={rev.reviewerName}
                                    reviewDate={rev.reviewDate}
                                    rating={rev.rating}
                                    reviewText={rev.reviewText}
                                />
                            ))}
                            <a href="/tutte-le-recensioni" className={styles.viewAllReviewsButton}>
                                Mostra tutte le recensioni
                            </a>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
}