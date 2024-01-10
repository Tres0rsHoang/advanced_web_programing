import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { joinClassApi } from '../api/classService';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function JoinClass() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const classCode = searchParams.get("classCode");
  const invitationType = searchParams.get("type");

  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(()=>{
    let ignore = false;
    if(!localStorage.getItem('token')) {
      navigate('/login');
    }
    async function fetchData() {
      var response = await joinClassApi(classCode, invitationType);

      if (!ignore) {
        if (response.status === 200) {
          navigate('/student/enrolled');
          toast.success('Join class successful');
        }
        else {
          navigate('/');
        }    
      }
    }
    
    fetchData();
    return () => {ignore = true}
  }, []);
  
  return (
    <div>
      
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}