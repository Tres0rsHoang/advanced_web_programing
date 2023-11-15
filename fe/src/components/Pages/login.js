import { useRef, useState, useEffect, useContext } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { IconButton } from '@mui/material';
import { KeyboardBackspace } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import AuthContext from '../../context/AuthProvider';

const LOGIN_URL = '/login';
const Auth_URL = '/profile';

const defaultTheme = createTheme();
const Login = () => {
  const navigate = useNavigate();

  const { setAuth } = useContext(AuthContext);
  const userRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, [])

  useEffect(() => {
      setErrMsg('');
  }, [email, password])

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const params = {
        "email": email,
        "password": password
      };

      console.log(email);
      console.log(password);

      const response = await axios.post(LOGIN_URL, params, {
        headers: {
          'Content-Type': 'application/json'
        }
      }); 
      
      console.log(JSON.stringify(response?.data));
      const accessToken = response?.data?.access_token;
      localStorage.setItem("access_token", accessToken);

      setAuth({ email, password, accessToken });
      setEmail('');
      setPassword('');
      setSuccess(true);
    } catch (err) {
      if (!err?.response) {
          setErrMsg('No Server Response');
      } else {
          setErrMsg('Login Failed');
      }
      errRef.current.focus();
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
      {success ? (
                <section>
                    <h1>You are logged in!</h1>
                    <br />
                    <p>
                        <a href="/">Go to Home</a>
                    </p>
                </section>
      ) : (
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
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
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
      )}
    </ThemeProvider>
  );
}

export default Login;