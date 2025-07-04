import React, { useState } from 'react';
import { useGlobalContext } from '../context/GlobalContext';
import styles from './DetailPage.module.css';
import ReviewCard from '../components/ReviewCard';
import { useTranslation } from 'react-i18next';
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
    const { t } = useTranslation();
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
                        <div className={styles.mainPhoto}>{t('mainPhoto')}</div>
                        <div className={styles.thumbnailPhoto}>{t('interiorPhoto')}</div>
                        <div className={styles.thumbnailPhoto}>{t('dishesPhoto')}</div>
                        <div className={styles.thumbnailPhoto}>{t('terracePhoto')}</div>
                        <div className={styles.thumbnailPhoto}>{t('morePhotos')}</div>
                    </div>

                    <div className={styles.tagsContainer}>
                        <span className={styles.tag}>{t('seafoodCuisine')}</span>
                        <span className={styles.tag}>{t('terracePhoto')}</span>
                        <span className={styles.tag}>{t('open')}</span>
                    </div>

                    <h1 className={styles.restaurantName}>{t('restaurantName')}</h1>

                    <div className={styles.rating}>
                        {renderStars(4.8)}
                        <span className={styles.reviewsCount}>4.8 (247 {t('reviewsLowecase')})</span>
                    </div>

                    <p className={styles.address}>{t('restaurantAddress')}</p>
                </div>

                {/* Sezione Destra: Modulo di Prenotazione*/}
                <div className={styles.rightSection}>
                    <h3 className={styles.bookingTitle}>{t('bookingTitle')}</h3>

                    <form onSubmit={handleSubmitBooking}>
                        <div className={styles.formGroup}>
                            <label htmlFor="bookingDate" className={styles.formLabel}>{t('bookingDateLabel')}</label>
                            <input
                                type="text"
                                id="bookingDate"
                                className={`${styles.formInput} ${styles.dateInput}`}
                                placeholder={t('datePlaceholder')}
                                value={selectedDate}
                                onChange={(e) => setSelectedDate(e.target.value)}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="bookingTime" className={styles.formLabel}>{t('bookingTimeLabel')}</label>
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
                            <label htmlFor="bookingPeople" className={styles.formLabel}>{t('bookingPeopleLabel')}</label>
                            <select
                                id="bookingPeople"
                                className={styles.formSelect}
                                value={selectedPeople}
                                onChange={(e) => setSelectedPeople(e.target.value)}
                            >
                                <option value="1 persona">{t('onePerson')}</option>
                                <option value="2 persone">{t('twoPeople')}</option>
                                <option value="3 persone">{t('threePeople')}</option>
                                <option value="4 persone">{t('fourPeople')}</option>
                                <option value="5 persone">{t('fivePeople')}</option>
                                <option value="6 persone">{t('sixPeople')}</option>
                            </select>
                        </div>

                        <button type="submit" className={styles.submitButton}>
                            {t('reserveNow')}
                        </button>
                    </form>

                    <div className={styles.priceInfo}>
                        <span>{t('averagePrice')}</span>
                        <span>{t('averagePriceValue')}</span>
                    </div>

                    <div className={styles.contactInfo}>
                        <span>{t('phone')}</span>
                        <span className={styles.contactValue}>{t('phoneNumber')}</span>
                    </div>

                    <div className={styles.contactInfo}>
                        <span>{t('website')}</span>
                        <a href="http://www.osteriadelporto.it" target="_blank" rel="noopener noreferrer" className={styles.contactValue}>
                            {t('websiteUrl')}
                        </a>
                    </div>
                </div>
            </section>
            <section className={styles.bottomSection}>
                {/* Nuova Sezione: Descrizione, Orari e Servizi */}
                <div className={styles.detailsSection}>
                    <div className={styles.descriptionSection}>
                        <div className={styles.descriptionSectionHeading}>
                            <h2 className={styles.sectionHeading}>{t('descriptionHeading')}</h2>
                            <p className={styles.descriptionParagraph}>
                                {t('descriptionParagraph1')}
                            </p>
                            <p className={styles.descriptionParagraph}>
                                {t('descriptionParagraph2')}
                            </p>
                        </div>

                        <div className={styles.openingHoursSection}>
                            <h2 className={styles.sectionHeading}>{t('openingHoursHeading')}</h2>
                            <ul className={styles.openingHoursList}>
                                <li className={styles.openingHourItem}>
                                    <span>{t('monday')}</span>
                                    <span className={styles.closedLabel}>{t('closed')}</span>
                                </li>
                                <li className={styles.openingHourItem}>
                                    <span>{t('tuesdaySunday')}</span>
                                    <span className={styles.openingTime}>19:00 - 23:30</span>
                                </li>
                                <li className={styles.openingHourItem}>
                                    <span>{t('saturdaySunday')}</span>
                                    <span className={styles.openingTime}>12:30 - 15:00, 19:00 - 23:30</span>
                                </li>
                            </ul>
                        </div>

                        <div className={styles.servicesSection}>
                            <h2 className={styles.sectionHeading}>{t('services')}</h2>
                            <div className={styles.servicesGrid}>
                                <div className={styles.serviceItem}><FaWifi className={styles.serviceIcon} /> {t('freeWifi')}</div>
                                <div className={styles.serviceItem}><FaParking className={styles.serviceIcon} /> {t('parking')}</div>
                                <div className={styles.serviceItem}><FaWheelchair className={styles.serviceIcon} /> {t('accessible')}</div>
                                <div className={styles.serviceItem}><FaCreditCard className={styles.serviceIcon} /> {t('creditCards')}</div>
                                <div className={styles.serviceItem}><FaWineGlassAlt className={styles.serviceIcon} /> {t('terraceService')}</div>
                                <div className={styles.serviceItem}><FaWineGlassAlt className={styles.serviceIcon} /> {t('wineList')}</div>
                            </div>
                        </div>
                    </div>

                    {/* Sezione Destra: Mappa e Contatti */}
                    <div className={styles.mapAndContactSection}>
                        <div className={styles.mapSection}>
                            <h2 className={styles.sectionHeading}>{t('mapHeading')}</h2>
                            <div className={styles.mapContainer}>
                                {t('mapInteractive')}
                            </div>
                            <a href="https://maps.google.com/?q=Osteria+del+Porto+Napoli" target="_blank" rel="noopener noreferrer" className={styles.getDirectionsButton}>
                                {t('getDirections')}
                            </a>
                        </div>

                        <div className={styles.contactInfoBlock}>
                            <h2 className={styles.sectionHeading}>{t('contactInfoHeading')}</h2>
                            <div className={styles.contactItem}>
                                <FaPhoneAlt className={styles.contactIcon} />
                                <a href="tel:0811234567" className={styles.contactLink}>{t('phoneNumber')}</a>
                            </div>
                            <div className={styles.contactItem}>
                                <FaEnvelope className={styles.contactIcon} />
                                <a href="mailto:info@osteriadelporto.it" className={styles.contactLink}>{t('emailContact')}</a>
                            </div>
                            <div className={styles.contactItem}>
                                <FaGlobe className={styles.contactIcon} />
                                <a href="http://www.osteriadelporto.it" target="_blank" rel="noopener noreferrer" className={styles.contactLink}>{t('websiteUrl')}</a>
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
                        <h2 className={styles.reviewsCountText}>{t('reviewCountText')}</h2>
                        <button className={styles.writeReviewButton}>{t('writeReviewButton')}</button>
                    </div>

                    <div className={styles.reviewsContent}>
                        <div className={styles.overallRating}>
                            <div className={styles.overallScore}>4.8</div>
                            <div className={styles.overallRatingStars}>{renderStars(4.8, '1.8em')}</div>
                            <div className={styles.overallReviewsCount}>{t('overallRatingBasedOn')} 247 {t('reviewsLowecase')}</div>
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
                                {t('viewAllReviews')}
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}