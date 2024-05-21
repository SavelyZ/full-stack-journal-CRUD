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
        <Route path='/add/:shop_number/:goods_amount/:goods_price/:goods_number/:typePage' element={<AddCar></AddCar>}></Route>
        <Route path='/card/:shop_number/:shop_name' element={<CarCard></CarCard>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
