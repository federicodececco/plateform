import ReactGA from "react-ga4"

const MEASUREMENT_ID = import.meta.env.VITE_GA_ID


export const initGA = () => {
  ReactGA.initialize(MEASUREMENT_ID, {
    debug: import.meta.env.VITE_GA_MODE === 'debug', // da utilizzare per il debug in sviluppo
  });
};
/* traccia le views di una pagina */
export const trackPageView = (path, title) => {
  ReactGA.send({ 
    hitType: 'pageview', 
    page: path, 
    title: title 
  });
};
/* traccia degli eventi da definire */
export const trackEvent = (action, category, label, value) => {
  ReactGA.event({
    action: action,
    category: category,
    label: label,
    value: value,
  });
};
/* traccia possibilmente qualsiasi cosa si voglia */
export const trackCustomEvent = (eventName, parameters = {}) => {
  ReactGA.gtag('event', eventName, parameters);
};