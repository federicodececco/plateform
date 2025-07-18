import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GlobalProvider } from './context/GlobalContext';
import AppLayout from './layout/AppLayout';
import HomePage from './pages/HomePage';
import DetailPage from './pages/DetailPage';
import SearchPage from './pages/SearchPage';
import ErrorPage from './pages/ErrorPage';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <GlobalProvider>
      <BrowserRouter>
        <Routes>


          <Route path="/login" element={<LoginPage />} />
          <Route element={<AppLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path='/search'>
              <Route index element={<SearchPage />}></Route>
              <Route path=':region' element={<SearchPage />}></Route>
            </Route>
            <Route path="/detail/:id" element={<DetailPage />} />
          </Route>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </GlobalProvider>
  )
}

export default App;