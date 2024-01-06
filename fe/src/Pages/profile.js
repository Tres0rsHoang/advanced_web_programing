import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import axios from '../api/axios';
import { useRef } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MiniDrawer from '../components/Drawer';
import { Avatar } from '@mui/material';

const Auth_URL = '/profile';

const EMAIL_REGEX = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
const PHONE_REGEX = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
const NAME_REGEX = /\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/;

export default function Profile() {
  const errRef = useRef();
  const successRef = useRef();
  const navigate = useNavigate();
  
  const user = JSON.parse(localStorage.getItem('user'));

  const [email, setEmail] = useState(user ? user.email : '');
  const [validEmail, setValidEmail] = useState(false);

  const [phoneNumber, setPhoneNumber] = useState(user.phone_number ? user.phone_number : '');
  const [validPhoneNumber, setValidPhoneNumber] = useState(true);

  const [firstName, setFirstName] = useState(user ? user.first_name || user.givenName : '');
  const [validFirstName, setValidFirstName] = useState(false);

  const [lastName, setLastName] = useState(user ? user.last_name || user.familyName : '');
  const [validLastName, setValidLastName] = useState(false);

  const [errMsg, setErrMsg] = useState('');
  const [successMessage, setSuccessMessage] = useState('');


  useEffect(() => {
      setValidEmail(EMAIL_REGEX.test(email));
  }, [email])

  console.log(phoneNumber);
  useEffect(() => {
    setValidPhoneNumber(PHONE_REGEX.test(phoneNumber) || phoneNumber === '');
  }, [phoneNumber])

  useEffect(() => {
    setValidFirstName(NAME_REGEX.test(firstName));
  }, [firstName])

  useEffect(() => {
    setValidLastName(NAME_REGEX.test(lastName));
  }, [lastName])

  useEffect(() => {
      setErrMsg('');
  }, [email, phoneNumber, firstName, lastName])

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const params = {
        "email": email,
        "phone_number": phoneNumber,
        "first_name": firstName,
        "last_name": lastName
      };

      const response = await axios.patch(Auth_URL, params, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem("token")
        }
      }); 
      
      console.log(JSON.stringify(response?.data));

      try {
        const response = await axios.get(Auth_URL, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem("token")
          }
        }); 
        
        console.log(JSON.stringify(response?.data));
        localStorage.setItem("user", JSON.stringify(response.data));
      } catch (err) {
        if (!err?.response) {
            setErrMsg('No Server Response');
        } else {
            setErrMsg('Get current user failed');
        }
      }
      setSuccessMessage('Edit profile successful');
      navigate("/profile");
    } catch (err) {
      if (!err?.response) {
        console.log('No Server Response');
      } else {
        console.log('Edit profile Failed');
      }
    }
}

  return (
    <React.Fragment>
      <CssBaseline />
      <MiniDrawer>
      <Container component="main" maxWidth="sm">
          <CssBaseline />
          <Box
            sx={{
              marginTop: '20px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <p ref={successRef} className={successMessage ? "successMsg" : "offscreen"} aria-live="assertive">{successMessage}</p>  
            <Avatar src={user.imageUrl} sx={{ width: 100, height: 100, background: '#02579A'}}>
                  {firstName.charAt(0)}
            </Avatar>
            <Typography gutterBottom component="div" sx={{fontSize: '25px', margin: '20px 0'}}>
                {firstName} {lastName}
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
                disabled={!validEmail || !validFirstName || !validLastName || !validPhoneNumber ? true : false}
              >
                Edit Profile
              </Button>
            </Box>
          </Box>
        </Container>
      </MiniDrawer>
      </React.Fragment>
  );
}