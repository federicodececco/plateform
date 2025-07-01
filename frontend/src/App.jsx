import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { GlobalProvider } from './context/GlobalContext';
import AppLayout from './layout/AppLayout';
import HomePage from './pages/HomePage';
import DetailPage from './pages/DetailPage';
import SearchPage from './pages/SearchPage';

function App() {

  return (
    <GlobalProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/Search" element={<SearchPage />} />
            <Route path="/Detail" element={<DetailPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </GlobalProvider>
  )
}

export default App
