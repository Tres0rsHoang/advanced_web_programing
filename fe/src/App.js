import { Route, Routes } from 'react-router-dom';
import './App.css';
import ConfirmResetPassword from './Pages/ConfirmResetPassword';
import AboutUs from './Pages/aboutUs';
import Home from './Pages/home';
import Landing from './Pages/landing';
import Login from './Pages/login';
import Products from './Pages/products';
import Profile from './Pages/profile';
import ResetPassword from './Pages/resetPassword';
import SignUp from './Pages/signUp';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/landing' element={<Landing />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signUp' element={<SignUp />} />
        <Route path='/products' element={<Products />} />
        <Route path='/aboutUs' element={<AboutUs />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/resetPassword' element={<ResetPassword />} />
        <Route path='/reset-password' element={<ConfirmResetPassword />} />
      </Routes>
    </div>
  );
}

export default App;
