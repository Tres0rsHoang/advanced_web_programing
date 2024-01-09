import { KeyboardBackspace } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { signUpApi } from '../api/authService';
import { useNavigate } from 'react-router-dom';


const defaultTheme = createTheme();

const EMAIL_REGEX = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const PHONE_REGEX = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
const NAME_REGEX = /\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/;

export default function SignUp() {
  const userRef = useRef();

  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(false);

  const [password, setPassword] = useState('');
  const [validPassword, setValidPassword] = useState(false);

  const [matchPwd, setMatchPwd] = useState('');
  const [validMatch, setValidMatch] = useState(false);

  const [phoneNumber, setPhoneNumber] = useState('');
  const [validPhoneNumber, setValidPhoneNumber] = useState(false);

  const [firstName, setFirstName] = useState('');
  const [validFirstName, setValidFirstName] = useState(false);

  const [lastName, setLastName] = useState('');
  const [validLastName, setValidLastName] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    userRef.current.focus();
  }, [])

  useEffect(() => {
      setValidEmail(EMAIL_REGEX.test(email));
  }, [email])

  useEffect(() => {
      setValidPassword(PWD_REGEX.test(password));
      setValidMatch(password === matchPwd);
  }, [password, matchPwd])

  useEffect(() => {
    setValidPhoneNumber(PHONE_REGEX.test(phoneNumber));
  }, [phoneNumber])

  useEffect(() => {
    setValidFirstName(NAME_REGEX.test(firstName));
  }, [firstName])

  useEffect(() => {
    setValidLastName(NAME_REGEX.test(lastName));
  }, [lastName])

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if button enabled with JS hack
    const v1 = EMAIL_REGEX.test(email);
    const v2 = PWD_REGEX.test(password);
    const v3 = PHONE_REGEX.test(phoneNumber);
    const v4 = NAME_REGEX.test(firstName);
    const v5 = NAME_REGEX.test(lastName);

    if (!v1 || !v2 || !v3 || !v4 || !v5) {
        toast.error("Invalid Entry!");
        return;
    }

    try {

      const response = await signUpApi(email, password, phoneNumber, firstName, lastName);

      console.log(response)

      if(response.status !== 200) {
        toast.error(response.data.messages);
        return;
      }
      //clear state and controlled inputs
      //need value attrib on inputs for this
      setEmail('');
      setPassword('');
      setMatchPwd('');
      setPhoneNumber('');
      setFirstName('');
      setLastName('');

      toast.success(response.data.messages);
      navigate("/login");
    } catch (err) {
        if (!err?.response) {
          toast.error('Server not responding...');
        } else if (err.response?.status === 409) {
          toast.error('Email already exists!');
        } else {
          toast.error('Registration Failed!')
        }
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
              mt: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component="h1" variant="h4">
              Sign up
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    ref={userRef}
                    onChange={(e) => setFirstName(e.target.value)}
                    value={firstName}
                    aria-invalid={validFirstName ? "false" : "true"}
                    aria-describedby="firstNameNote"
                  />
                  <p id="firstNameNote" className={firstName && !validFirstName ? "instructions" : "offscreen"}>
                    Invalid first name
                  </p>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                    onChange={(e) => setLastName(e.target.value)}
                    value={lastName}
                    aria-invalid={validLastName ? "false" : "true"}
                    aria-describedby="lastNameNote"
                  />
                  <p id="lastNameNote" className={lastName && !validLastName ? "instructions" : "offscreen"}>
                    Invalid last name
                  </p>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    aria-invalid={validEmail ? "false" : "true"}
                    aria-describedby="emailNote"
                  />
                  <p id="emailNote" className={email && !validEmail ? "instructions" : "offscreen"}>
                    Invalid email
                  </p>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    aria-invalid={validPassword ? "false" : "true"}
                    aria-describedby="passwordNote"
                />
                <p id="passwordNote" className={password && !validPassword ? "instructions" : "offscreen"}>
                    8 to 24 characters.<br />
                    Must include uppercase and lowercase letters, a number and a special character.<br />
                    Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                </p>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    id="confirmPassword"
                    autoComplete="confirm-password"
                    onChange={(e) => setMatchPwd(e.target.value)}
                    value={matchPwd}
                    aria-invalid={validMatch ? "false" : "true"}
                    aria-describedby="confirmNote"
                />
                <p id="confirmNote" className={matchPwd && !validMatch ? "instructions" : "offscreen"}>
                    Passwords do not match
                </p>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="phone"
                    label="Phone Number"
                    type="tel"
                    id="phone"
                    autoComplete="phone"
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    value={phoneNumber}
                    aria-invalid={validPhoneNumber ? "false" : "true"}
                    aria-describedby="phoneNote"
                  />
                  <p id="phoneNote" className={phoneNumber && !validPhoneNumber ? "instructions" : "offscreen"}>
                    Invalid phone number
                  </p>
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, padding: '14px' }}
                disabled={!validEmail || !validFirstName || !validLastName || !validPassword || !validPhoneNumber || !validMatch ? true : false}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="center">
                <Grid item>
                      <Link href="/login" variant="body2">
                      Already have an account? Sign in
                      </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
    </ThemeProvider>
  );
}