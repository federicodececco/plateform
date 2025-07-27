import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { GlobalProvider } from './context/GlobalContext';
import AppLayout from './layout/AppLayout';
import HomePage from './pages/HomePage';
import DetailPage from './pages/DetailPage';
import SearchPage from './pages/SearchPage';
import ErrorPage from './pages/ErrorPage';
import LoginPage from './pages/LoginPage';
import ReactGA from "react-ga4"
import SettingPlacesPage from './pages/SettingPlacesPage';
import { initGA } from './config/analytics';
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from './context/AuthContext';
import { useEffect } from 'react';

/* traccia automaticamente l'utilizzo delle pagine da parte dell'utente */
function Analytics() {
  const location = useLocation();

  useEffect(() => { ReactGA.send({ 
      hitType: 'pageview', 
      page: location.pathname + location.search,
      title: document.title
    });
  }, [location]);

  return null;
}


function App() {
  
/* se l'ambiente è impostato su prod, avvia GA */
useEffect(() => {

    if (process.env.NODE_ENV === 'prod') {
      initGA();
    }
  }, []);

  return (
    <GlobalProvider>
      <AuthProvider>
      <BrowserRouter>
        <Routes>


          <Route path="/login" element={<LoginPage />} />
          <Route element={<AppLayout />}>
            <Route path="/" element={<HomePage />} />

            <Route path='/search'>
              <Route index element={<SearchPage />}></Route>
              <Route path=':region' element={<SearchPage />}></Route>
            </Route>
            <Route element={<ProtectedRoute/>}>
             <Route path="/addplaces" element={<SettingPlacesPage />} />
            </Route>
           <Route path="/detail/:id" element={<DetailPage />} />

            <Route path="/search" element={<SearchPage />} />
            {/* route protetta, solo per esempio, non puoi accedere senza login */}
            
             <Route path="/detail" element={<DetailPage />} />
          

          </Route>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
      </AuthProvider>
    </GlobalProvider>
  )
}

export default App;