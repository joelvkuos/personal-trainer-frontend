import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Customers from './pages/Customers';
import Trainings from './pages/Trainings';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Customers />} />
        <Route path='/trainings' element={<Trainings />} />
      </Routes>
    </>
  )
}
export default App
