import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Pages/home';
import Landing from './components/Pages/landing';
import Login from './components/Pages/login';
import SignUp from './components/Pages/signUp';
import Products from './components/Pages/products';
import AboutUs from './components/Pages/aboutUs';
import Profile from './components/Pages/profile';

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
      </Routes>
    </div>
  );
}

export default App;
