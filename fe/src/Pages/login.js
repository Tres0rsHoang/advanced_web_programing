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
import { toast } from "react-toastify";
import { FacebookLoginButton } from 'react-social-login-buttons';
import { LoginSocialFacebook } from 'reactjs-social-login';
import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';
import { useDispatch, useSelector } from 'react-redux';
import { handleLoginRedux, handleGoogleLoginRedux } from '../redux/actions/userAction';

const defaultTheme = createTheme();
const FacebookClientID = '679614957611578';
const GoogleClientID = '355691189679-g1bqbv7ar8r0bcii90alovankquv19vu.apps.googleusercontent.com';
//const GoogleClientSerect = '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';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userRef = useRef();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const account = useSelector(state => state.user.account);

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: GoogleClientID,
        scope: ""
      })
    };

    gapi.load('client:auth2', start);
  });


  useEffect(() => {
    userRef.current.focus();
  }, [])

  useEffect(() => {
  }, [email, password]);

  useEffect(() => {
    if(account && account.auth === true) {
      navigate('/');
    }
  }, [account]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!email || !password) {
      toast.error("Email/Password is required!");
      return;
    }

    dispatch(handleLoginRedux(email, password));
  }

  const onSuccess = async (res) => {
    dispatch(handleGoogleLoginRedux(res));
  }

  const onFailure = (res) => {
    console.log("Login failed! Res: ", res);
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
                  <Link href="/resetPassword" variant="body2">
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
            <Box sx={{
              marginTop: 4,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
            <LoginSocialFacebook
              appId={FacebookClientID}
              onResolve={(response) => {
                console.log(response);
              }}
              onReject={(error) => {
                console.log(error);
              }}
            >
              <FacebookLoginButton />
            </LoginSocialFacebook>

            <GoogleLogin
              clientId={GoogleClientID}
              buttonText='Log in with Google'
              onSuccess={onSuccess}
              onFailure={onFailure}
              cookiePolicy={'single_host_origin'}
              isSignedIn={true}
            />
            </Box>
          </Box>
        </Container>
    </ThemeProvider>
  );
}

export default Login;