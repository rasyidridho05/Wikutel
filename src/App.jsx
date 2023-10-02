import { BrowserRouter, Routes, Route } from "react-router-dom";

// admin side
import Login from './pages/Admin/Login';
import Dashboard from './pages/Admin/Dashboard';
import RoomType from "./pages/Admin/RoomType/RoomType";
import Room from "./pages/Admin/Room";
import User from "./pages/Admin/User";
import Customer from "./pages/Admin/Customer";
import HistoryTransaksi from "./pages/Admin/HistoryTransaksi";

// customer side
import RegisterCust from "./pages/Customer/Register";
import LoginCust from "./pages/Customer/Login";
import Home from "./pages/Customer/Home";
import RoomTypeCustomer from "./pages/Customer/RoomType/RoomType";
import Booking from "./pages/Customer/Booking";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* admin side */}
        <Route path="/" element={<Login />} exact></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/room-type" element={<RoomType />}></Route>
        <Route path="/room" element={<Room />}></Route>
        <Route path="/user" element={<User />}></Route>
        <Route path="/customer" element={<Customer />}></Route>
        <Route path="/history-transaksi" element={<HistoryTransaksi />}></Route>

        {/* customer side */}
        <Route path="/home" element={<Home />}></Route>
        <Route path="/login" element={<LoginCust />}></Route>
        <Route path="/register" element={<RegisterCust />}></Route>
        <Route path="/room-type-customer" element={<RoomTypeCustomer />}></Route>
        <Route path="/booking" element={<Booking />}></Route>
      </Routes>
    </BrowserRouter>

  );
}

export default App;