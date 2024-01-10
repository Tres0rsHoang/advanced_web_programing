import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { joinClassApi } from '../api/classService';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

export default function JoinClass() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const classCode = searchParams.get("classCode");
  const invitationType = searchParams.get("type");

  const [isLoading, setIsLoading] = React.useState(true);

  const [cancelToken, setCancelToken] = React.useState(null);

  React.useEffect(() => {
    if (cancelToken) {
      cancelToken.cancel('Operation canceled by the user.');
    }
    const newCancelToken = axios.CancelToken.source();
    setCancelToken(newCancelToken);
    joinClassApi(classCode, invitationType).then(response => {
      if (response.status === 200) {
        navigate('/student/enrolled');
        toast.success('Join class successful');
      }
      else {
        navigate('/');
      } 
    });

    return () => {
      if (newCancelToken) {
        newCancelToken.cancel('Component unmounted.');
      }
    };
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