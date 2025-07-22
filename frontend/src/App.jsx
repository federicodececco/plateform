import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GlobalProvider } from './context/GlobalContext';
import AppLayout from './layout/AppLayout';
import HomePage from './pages/HomePage';
import DetailPage from './pages/DetailPage';
import SearchPage from './pages/SearchPage';
import ErrorPage from './pages/ErrorPage';
import LoginPage from './pages/LoginPage';

import SettingPlacesPage from './pages/SettingPlacesPage';

import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from './context/AuthContext';



function App() {
  return (
    <GlobalProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>

            <Route path="/login" element={<LoginPage />} />
            <Route element={<AppLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/detail/:id" element={<DetailPage />} />
              <Route path='/search'>
                <Route index element={<SearchPage />}></Route>
                <Route path=':region' element={<SearchPage />}></Route>
              </Route>

              {/* route protetta, solo per esempio, non puoi accedere senza login */}
              <Route element={<ProtectedRoute />}>
              </Route>
              <Route path="/addplaces" element={<SettingPlacesPage />} />


            </Route>
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </GlobalProvider>
  )
}

export default App;