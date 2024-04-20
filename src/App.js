// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './CartContext'; // Import CartProvider
import Register from './Components/Register';
import Header from './Components/Header';
import ProfilePage from './Pages/ProfilePage';
import Login from './Components/Login';
import NotFound from './Pages/NotFound';
import Pricing from './Pages/Pricing';
import Aos from 'aos';
import 'aos/dist/aos.css'
import Start from './Pages/Start';
import Footer from './Components/Footer';
import Cart from './Pages/Cart';
import Dishes from './Pages/Dishes';
import Checkout from './Pages/Checkout';
import Contact from './Pages/Contact';

function App() {
  const [profilePictureUrl, setProfilePictureUrl] = useState(null);

  Aos.init();
  return (
    <Router>
      <CartProvider>
      <Header profilePictureUrl={profilePictureUrl} />
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/burger-terminal-wizard" element={<Start />} />
        <Route path="/*" element={<NotFound />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/dishes" element={<Dishes />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/contact" element={<Contact />} />
        <Route
          path="/profile"
          element={<ProfilePage setProfilePictureUrl={setProfilePictureUrl} />}
        />
      </Routes>
      <Footer/>
      </CartProvider>
    </Router>
  );
}

export default App;


