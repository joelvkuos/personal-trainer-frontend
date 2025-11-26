import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Customers from './pages/Customers';
import Trainings from './pages/Trainings';
import CalendarPage from './pages/Calendar';
import Statistics from './pages/Statistics';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Customers />} />
        <Route path='/trainings' element={<Trainings />} />
        <Route path='/calendar' element={<CalendarPage />} />
        <Route path='/statistics' element={<Statistics />} />
      </Routes>
    </>
  )
}
export default App
