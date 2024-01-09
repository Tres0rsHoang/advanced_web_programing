import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import AdminAccount from './Pages/admin/adminAcount';
import AdminClasses from './Pages/admin/adminClasses';
import AdminMapping from './Pages/admin/adminMapping';
import ConfirmResetPassword from './Pages/confirmResetPassword';
import Home from './Pages/home';
import JoinClass from './Pages/joinClass';
import Login from './Pages/login';
import Profile from './Pages/profile';
import ResetPassword from './Pages/resetPassword';
import SignUp from './Pages/signUp';
import Enrolled from './Pages/student/enrolled';
import StudentGrade from './Pages/student/studentClassDetail/grade';
import StudentPeople from './Pages/student/studentClassDetail/people';
import StudentStream from './Pages/student/studentClassDetail/stream';
import TeacherGrade from './Pages/teacher/teacherClassDetail/grade';
import TeacherGradeReview from './Pages/teacher/teacherClassDetail/gradeReview';
import TeacherPeople from './Pages/teacher/teacherClassDetail/people';
import TeacherStream from './Pages/teacher/teacherClassDetail/stream';
import Teaching from './Pages/teacher/teaching';
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
          <Route path='/joinClass' element={<JoinClass />} />
          
          <Route path='/student/enrolled' element={<Enrolled/>} />
          <Route path='student/classDetail/stream' element={<StudentStream />} />
          <Route path='student/classDetail/grade' element={<StudentGrade />} />
          <Route path='student/classDetail/people' element={<StudentPeople />} />
          
          <Route path='/teacher/teaching' element={<Teaching/>} />
          <Route path='/teacher/classDetail/stream' element={<TeacherStream />} />
          <Route path='/teacher/classDetail/people' element={<TeacherPeople />} />
          <Route path='/teacher/classDetail/grade' element={<TeacherGrade />} />
          <Route path='/teacher/classDetail/gradeReview' element={<TeacherGradeReview />} />

          <Route path='/admin/account' element={<AdminAccount />}></Route>
          <Route path='/admin/classes' element={<AdminClasses />}></Route>
          <Route path='/admin/mapping' element={<AdminMapping />}></Route>
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
