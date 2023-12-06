import { useContext, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
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
import { UserContext } from './context/userContext';

function App() {
  const { loginContext } = useContext(UserContext);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if(localStorage.getItem("access_token")) {
      loginContext(user.email, localStorage.getItem("access_token"))
    }
  }, [])

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
