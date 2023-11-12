import './App.css';
import { Route,Routes } from 'react-router-dom';
import HomePage from './HomePage/HomePage';
import DeliveryDetails from './DeliveryDetails/DeliveryDetails';
import { MyProvider } from './state/ContextApi';

function App() {
  return (
    <MyProvider>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route
          path="/deliveryDetails/:id"
          element={<DeliveryDetails />}
        ></Route>
      </Routes>
    </MyProvider>
  );
}

export default App;
