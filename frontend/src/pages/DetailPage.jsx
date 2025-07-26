import { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { useGlobalContext } from '../context/GlobalContext';
import styles from './DetailPage.module.css';
import AppGoogleMap from '../components/AppGoogleMap';
import ReviewCard from '../components/ReviewCard';
import BreadcrumbsCard from '../components/breadcrumbsCard';
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
} from 'react-icons/fa';

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

    const api = import.meta.env.VITE_API_URL
    const { i18n, t } = useTranslation();
    const { renderStars, renderPrice, getPlacesDetails, getPlacesPic, closeShowLanguageOptions } = useGlobalContext()
    const [formData, setFormData] = useState({ date: '', time: '19:30', people: '2 persone' })
    const [placeData, setPlaceData] = useState(null)
    const { id } = useParams()

    const getPlace = async () => {
        try {
            const data = await getPlacesDetails(id)
            console.log('data', data);
            setPlaceData(data)
        } catch (error) {
            console.error('Error fetching place details:', error);
        }
    }

    useEffect(() => {
        getPlace()
    }, [])

    const handleFormData = e => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }

    const handleSubmitBooking = (e) => {
        e.preventDefault();
        // alert(`Prenotazione per il ${selectedDate} alle ${selectedTime} per ${selectedPeople}.`);
        // console.log('Dettagli prenotazione:', { selectedDate, selectedTime, selectedPeople });
        console.log(formData);
    };

    if (!placeData) {
        return (
            <div className="loading">
                {t('loading')}
            </div>
        );
    }

    return (
        <>
            <BreadcrumbsCard region={placeData.region} />
            <div onClick={closeShowLanguageOptions} className={styles.pageContainer}>
                <section className={styles.upperSection}>
                    {/* Sezione Sinistra: Dettagli Ristorante e Galleria (Parte precedente) */}
                    <div className={styles.leftSection}>
                        <div className={styles.gallery}>
                            {placeData.photos.length > 0 ?
                                // Mappo solo le prime 5 foto
                                placeData.photos.slice(0, 5).map((img, index) =>
                                    <img
                                        key={index}
                                        className={index === 0 ? styles.mainPhoto : styles.thumbnailPhoto}
                                        src={`${api}/photo/filename/${img.fileName}`}
                                        alt={`Restaurant photo ${index + 1}`} // Buon pratica: aggiungi un alt text
                                    />)
                                :
                                <>
                                    <div className={styles.mainPhoto}>{t('mainPhoto')}</div>
                                    <div className={styles.thumbnailPhoto}>{t('interiorPhoto')}</div>
                                    <div className={styles.thumbnailPhoto}>{t('dishesPhoto')}</div>
                                    <div className={styles.thumbnailPhoto}>{t('terracePhoto')}</div>
                                    <div className={styles.thumbnailPhoto}>{t('morePhotos')}</div>
                                </>
                            }
                        </div>
                        <div className={styles.tagsContainer}>
                            <span className={styles.tag}>{t('seafoodCuisine')}</span>
                            <span className={styles.tag}>{t('terracePhoto')}</span>
                            <span className={styles.tag}>{t('open')}</span>
                        </div>

                        <h1 className={styles.restaurantName}>{placeData.name}</h1>

                        <div className={styles.rating}>
                            {renderStars(placeData.rating)}
                            <span className={styles.reviewsCount}>{placeData.rating} ({placeData.reviewNumber} {t('reviewsLowecase')})</span>
                        </div>

                        <p className={styles.address}>{placeData.address}, {placeData.adressNumber} - {placeData.cap} {placeData.city} ({placeData.province})</p>
                    </div>

                    {/* Sezione Destra: Modulo di Prenotazione*/}
                    <div className={styles.rightSection}>
                        <h3 className={styles.bookingTitle}>{t('bookingTitle')}</h3>

                        <form onSubmit={handleSubmitBooking}>
                            <div className={styles.formGroup}>
                                <label htmlFor="date">{t('bookingDateLabel')}</label>
                                <div className={styles["input-with-icon"]}>
                                    <input
                                        // placeholder={t('datePlaceholder')}
                                        name='date'
                                        type="date"
                                        id="date"
                                        value={formData.date}
                                        onChange={handleFormData}
                                    />
                                    <span className={styles["icon"]}>🗓️</span> {/* Icona a fianco */}
                                </div>
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="bookingTime" className={styles.formLabel}>{t('bookingTimeLabel')}</label>
                                <select
                                    id="bookingTime"
                                    name='time'
                                    className={styles.formSelect}
                                    value={formData.time}
                                    onChange={handleFormData}
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
                                    name="people"
                                    className={styles.formSelect}
                                    value={formData.people}
                                    onChange={handleFormData}
                                >
                                    <option value="1 persona">{t('onePerson')}</option>
                                    <option value="2 persone">{t('twoPeople')}</option>
                                    <option value="3 persone">{t('threePeople')}</option>
                                    <option value="4 persone">{t('fourPeople')}</option>
                                    <option value="5 persone">{t('fivePeople')}</option>
                                    <option value="6 persone">{t('sixPeople')}</option>
                                </select>
                            </div>

                            {/* <button type='submit' className={styles.submitButton}
                                disabled={!placeData.plateformURL}
                            >
                                {t('reserveNow')}
                            </button> */}
                            {placeData.plateformURL ? (
                                <a
                                    href={placeData.plateformURL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={styles.submitButton}
                                >
                                    {t('reserveNow')}
                                </a>
                            ) : (
                                <button
                                    className={styles.submitButton}
                                    disabled
                                >
                                    {t('notReserved')}
                                </button>
                            )}
                        </form>

                        <div className={styles.priceInfo}>
                            <span>{t('averagePrice')}</span>
                            <span>{renderPrice(placeData.priceRange)}</span>
                        </div>

                        <div className={styles.contactInfo}>
                            <span>{t('phone')}</span>
                            <a href={`tel:${placeData.phoneNumber}`} className={styles.contactValue}>{placeData.phoneNumber}</a>
                        </div>

                        <div className={styles.contactInfo}>
                            <span>{t('website')}</span>
                            <a href={placeData.webSiteURL} target="_blank" rel="noopener noreferrer" className={styles.contactValue}>
                                Vai al Sito
                            </a>
                        </div>
                    </div>
                </section>
                <section className={styles.bottomSection}>
                    {/* Nuova Sezione: Descrizione, Orari e Servizi */}
                    <div className={styles.detailsSection}>
                        <div className={styles.descriptionSection}>
                            {/* <div className={styles.descriptionSectionHeading}>
                                <h2 className={styles.sectionHeading}>{t('descriptionHeading')}</h2>
                                <p className={styles.descriptionParagraph}>
                                    {t('descriptionParagraph1')}
                                </p>
                                <p className={styles.descriptionParagraph}>
                                    {t('descriptionParagraph2')}
                                </p>
                            </div> */}

                            {/* <div className={styles.openingHoursSection}>
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
                            </div> */}

                            <div className={styles.servicesSection}>
                                <h2 className={styles.sectionHeading}>{t('services')}</h2>
                                <div className={styles.servicesGrid}>
                                    {placeData.categories.slice(0, 20).map((category, index) => (
                                        <span key={index} className={`${styles.category} ${!category.isVisible ? styles.hidden : ''}`}>
                                            {i18n.language === 'it' ? `${category.itName}` : `${category.enName}`}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div className={styles.servicesSection}>
                                <h2 className={styles.sectionHeading}>{t('services')}</h2>
                                <div className={styles.servicesGrid}>
                                    {placeData.tags.slice(0, 20).map((tag, index) => (
                                        <span key={index} className={`${styles.tag} ${!tag.isVisible ? styles.hidden : ''}`}>
                                            {i18n.language === 'it' ? `${tag.itName}` : `${tag.enName}`}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Sezione Destra: Mappa e Contatti */}
                        <div className={styles.mapAndContactSection}>
                            <AppGoogleMap
                                restaurantLat={placeData.latitude}
                                restaurantLng={placeData.longitude}
                                restaurantName={placeData.name}
                                restaurantPlaceId={placeData.plateformID}
                            />

                            <div className={styles.contactInfoBlock}>
                                <h2 className={styles.sectionHeading}>{t('contacts')}</h2>
                                <div className={styles.contactItem}>
                                    <FaPhoneAlt className={styles.contactIcon} />
                                    <a href={`tel:${placeData.phoneNumber}`} className={styles.contactLink}>{placeData.phoneNumber}</a>
                                </div>
                                <div className={styles.contactItem}>
                                    <FaGlobe className={styles.contactIcon} />
                                    <a href={placeData.webSiteURL} target="_blank" rel="noopener noreferrer" className={styles.contactLink}>Vai al Sito</a>
                                </div>
                                <div className={styles.contactItem}>
                                    <FaFacebookF className={styles.contactIcon} />
                                    <FaInstagram className={styles.contactIcon} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Nuova Sezione: Recensioni */}
                    {/* <div className={styles.reviewsSection}>
                        <div className={styles.reviewsHeader}>
                            <h2 className={styles.reviewsCountText}>{t('reviewCountText')}</h2>
                            <button className={styles.writeReviewButton}>{t('writeReviewButton')}</button>
                        </div>

                        <div className={styles.reviewsContent}>
                            <div className={styles.overallRating}>
                                <div className={styles.overallScore}>{placeData.rating}</div>
                                <div className={styles.overallRatingStars}>{renderStars(placeData.rating, '1.8em')}</div>
                                <div className={styles.overallReviewsCount}>{t('overallRatingBasedOn')} {placeData.reviewNumber} {t('reviewsLowecase')}</div>
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
                    </div> */}
                </section>
            </div>
        </>
    );
}