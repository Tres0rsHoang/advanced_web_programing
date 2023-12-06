import { Route, Routes } from 'react-router-dom';
import './App.css';
import ConfirmResetPassword from './components/Pages/ConfirmResetPassword';
import AboutUs from './components/Pages/aboutUs';
import Home from './components/Pages/home';
import Landing from './components/Pages/landing';
import Login from './components/Pages/login';
import Products from './components/Pages/products';
import Profile from './components/Pages/profile';
import ResetPassword from './components/Pages/resetPassword';
import SignUp from './components/Pages/signUp';

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
