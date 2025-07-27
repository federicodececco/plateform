import { useCallback } from 'react';
import ReactGA from 'react-ga4';

export const useAnalytics = () => {
 

    /* traccia i vari click di boottoni */
  const trackButtonClick = useCallback((buttonName, additionalData = {}) => {
    ReactGA.event({
      action: 'click',
      category: 'button',
      label: buttonName,
      ...additionalData
    });
  }, []);

  
 
    /* traccia le ricerche fatte*/
  const trackSearch = useCallback((searchTerm, results = null) => {
    ReactGA.gtag('event', 'search', {
      search_term: searchTerm,
      results_count: results
    });
  }, []);



  /* funzione analoga a quella contenuta in alaytics.js, per tracciare eventi personalizzati uniformandoli a GA4 */
  const trackCustomEvent = useCallback((eventName, parameters = {}) => {
    ReactGA.gtag('event', eventName, parameters);
  }, []);

 /* traccia qunto un utente scrolla le pagine  */
  const trackScroll = useCallback((percentage) => {
    ReactGA.event({
      action: 'scroll',
      category: 'engagement',
      label: `${percentage}%`,
      value: percentage
    });
  }, []);

  return {
    trackButtonClick,
    trackSearch,
    trackCustomEvent,
    trackScroll,
  };
};