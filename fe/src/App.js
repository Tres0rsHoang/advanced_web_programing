import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Grade from './Pages/classDetail/grade';
import People from './Pages/classDetail/people';
import Stream from './Pages/classDetail/stream';
import ConfirmResetPassword from './Pages/confirmResetPassword';
import Home from './Pages/home';
import Login from './Pages/login';
import Profile from './Pages/profile';
import ResetPassword from './Pages/resetPassword';
import SignUp from './Pages/signUp';
import { handleRefresh } from './redux/actions/userAction';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    if(localStorage.getItem('token')) {
      dispatch(handleRefresh());
    }
  }, []);

  return (
    <>
      <div className="App">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signUp' element={<SignUp />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/resetPassword' element={<ResetPassword />} />
          <Route path='/reset-password' element={<ConfirmResetPassword />} />
          <Route path='/classDetail/stream' element={<Stream />} />
          <Route path='/classDetail/grade' element={<Grade />} />
          <Route path='/classDetail/people' element={<People />} />
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
