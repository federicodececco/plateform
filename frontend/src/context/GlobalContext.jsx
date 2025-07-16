import { createContext, useContext, useState } from "react";
import {
    FaStar,
    FaRegStar
} from 'react-icons/fa';

const priceMap = {
    "free": "free",
    "inexpensive": "€",
    "moderate": "€€",
    "expensive": "€€€",
    "very expensive": "€€€€",
}

const GlobalContext = createContext();

function GlobalProvider({ children }) {
    const [navSearchBar, setNavSearchBar] = useState('');

    const renderStars = (rating, size = '1.2em') => {
        const totalStars = 5;
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        const emptyStars = totalStars - fullStars - (hasHalfStar ? 1 : 0);

        return (
            <div style={{ display: 'flex', alignItems: 'center', color: '#ffc107', fontSize: size }}>
                {[...Array(fullStars)].map((_, i) => <FaStar key={`full-${i}`} />)}
                {hasHalfStar && <FaRegStar key="half" style={{ transform: 'rotateY(180deg)' }} />}
                {[...Array(emptyStars)].map((_, i) => <FaRegStar key={`empty-${i}`} />)}
            </div>
        );
    };

    const renderPrice = price => priceMap[price.toLowerCase()];

    const globalProviderValue = {
        navSearchBar, setNavSearchBar,
        renderStars, renderPrice
    };

    return (
        <GlobalContext.Provider value={globalProviderValue}>
            {children}
        </GlobalContext.Provider>
    );
}

function useGlobalContext() {
    const context = useContext(GlobalContext);
    if (!context) {
        throw new Error("useGlobalContext error");
    }
    return context;
}

export { useGlobalContext, GlobalProvider };