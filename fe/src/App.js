import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Pages/home';
import Landing from './Pages/landing';
import Login from './Pages/login';
import SignUp from './Pages/signUp';
import Products from './Pages/products';
import AboutUs from './Pages/aboutUs';
import Profile from './Pages/profile';
import NavBar from './components/NavBar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useContext, useEffect } from 'react';
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
    <>
      <div className="App">
        <NavBar/>
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
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
