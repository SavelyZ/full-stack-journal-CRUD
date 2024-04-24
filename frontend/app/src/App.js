import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './Home/Home.component';
import AddCar from './AddCar/AddCar.component';
import CarCard from './CarCard/CarCard.component';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/add' element={<AddCar></AddCar>}></Route>
        <Route path='/card/:id' element={<CarCard></CarCard>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
