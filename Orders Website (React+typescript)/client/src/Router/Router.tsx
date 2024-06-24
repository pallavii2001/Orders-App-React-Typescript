
import {  Routes, Route } from 'react-router-dom';
import OrdersList from '../components/OrdersList'
import OrderDetails from '../components/OrderDetails/OrderDetails';

function Routerindex(){
return(

    <Routes>
      <Route path="/" element={<OrdersList />} />
      <Route path="/myorder/:id" element={<OrderDetails />} />
    </Routes>

  
);
}
export default Routerindex;
