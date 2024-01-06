import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import ConfirmResetPassword from './Pages/ConfirmResetPassword';
import Home from './Pages/home';
import Login from './Pages/login';
import Profile from './Pages/profile';
import ResetPassword from './Pages/resetPassword';
import SignUp from './Pages/signUp';
import { handleRefresh } from './redux/actions/userAction';
import Enrolled from './Pages/student/enrolled';
import Teaching from './Pages/teacher/teaching';
import StudentStream from './Pages/student/studentClassDetail/stream';
import StudentGrade from './Pages/student/studentClassDetail/grade';
import TeacherStream from './Pages/teacher/teacherClassDetail/stream';
import TeacherGrade from './Pages/teacher/teacherClassDetail/grade';
import StudentPeople from './Pages/student/studentClassDetail/people';
import TeacherPeople from './Pages/teacher/teacherClassDetail/people';
import TeacherGradeReview from './Pages/teacher/teacherClassDetail/gradeReview';

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
          
          <Route path='/student/enrolled' element={<Enrolled/>} />
          <Route path='student/classDetail/stream' element={<StudentStream />} />
          <Route path='student/classDetail/grade' element={<StudentGrade />} />
          <Route path='student/classDetail/people' element={<StudentPeople />} />

          
          <Route path='/teacher/teaching' element={<Teaching/>} />
          <Route path='/teacher/classDetail/stream' element={<TeacherStream />} />
          <Route path='/teacher/classDetail/people' element={<TeacherPeople />} />
          <Route path='/teacher/classDetail/grade' element={<TeacherGrade />} />
          <Route path='/teacher/classDetail/gradeReview' element={<TeacherGradeReview />} />
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
