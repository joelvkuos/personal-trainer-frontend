import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Customers from './pages/Customers';
import Trainings from './pages/Trainings';
import CalendarPage from './pages/Calendar';
import Statistics from './pages/Statistics';

function App() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#67645E' }}>
      <Navbar />
      <div style={{ padding: '2rem' }}>
        <Routes>
          <Route path='/' element={<Customers />} />
          <Route path='/trainings' element={<Trainings />} />
          <Route path='/calendar' element={<CalendarPage />} />
          <Route path='/statistics' element={<Statistics />} />
        </Routes>
      </div>
    </div>
  )
}
export default App
