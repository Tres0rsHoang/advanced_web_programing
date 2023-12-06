import { KeyboardBackspace } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUserApi, loginApi } from '../api/authService';
import { toast } from "react-toastify";
import { UserContext } from '../context/userContext';

const defaultTheme = createTheme();
const Login = () => {
  const navigate = useNavigate();

  const userRef = useRef();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { loginContext } = useContext(UserContext);

  useEffect(() => {
    userRef.current.focus();
  }, [])

  useEffect(() => {
  }, [email, password])

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!email || !password) {
      toast.error("Email/Password is required!");
      return;
    }

    try {
      let response = await loginApi(email, password);
      //console.log(response);

      if (response && response.data.access_token) {
        loginContext(email, response.data.access_token);
        
        try {
          let response = await getCurrentUserApi();
          console.log(response);
    
          if (response && response.data) {
            localStorage.setItem('user', JSON.stringify(response.data));
          } else {
            if (response && response.data.error) {
              toast.error(response.data.error);
            }
          }
        } catch {
          toast.error("Server not responding...");
          return;
        }

        setEmail('');
        setPassword('');
        navigate("/");
      } else {
        if (response && response.data.error) {
          toast.error(response.data.error);
        }
      }
    } catch {
      toast.error("Server not responding...");
      return;
    }
}


  return (
    <ThemeProvider theme={defaultTheme}>
      <IconButton 
          aria-label="back" 
          size="small" 
          sx={{alignItems: 'start', mt: 4, ml: 3, color: '#3f51b5'}} 
          onClick={() => navigate(-1)}
        >
        <KeyboardBackspace fontSize="large" />
      </IconButton>
        <Container component="main" maxWidth="sm">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component="h1" variant="h4">
              Sign in
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                ref={userRef}
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, padding: '14px' }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/signUp" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
    </ThemeProvider>
  );
}

export default Login;