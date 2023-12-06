import { Grid } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from '../../api/axios';

const CONFIRM_RESET_PASSWORD_URL = '/confirm-reset-password';
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const defaultTheme = createTheme();
const ConfirmResetPassword = () => {
    const navigate = useNavigate();

    const errRef = useRef();

    const [searchParams] = useSearchParams();
    const [confirmPassword] = useState('');
    const [password, setPassword] = useState('');

    const [validPassword, setValidPassword] = useState(false);
    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);

    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        setErrMsg('');
    }, [confirmPassword, password])

    useEffect(() => {
        setValidPassword(PWD_REGEX.test(password));
        setValidMatch(password === matchPwd);
    }, [password, matchPwd])

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validate = PWD_REGEX.test(password);

        if (!validate) {
            setErrMsg("Invalid Entry!");
            return;
        }

        try {
            const resetCode = searchParams.get("reset-code");
            const email = searchParams.get("email");

            const params = {
                "email": email,
                "reset_code": resetCode,
                "new_password": password,
            };

            const response = await axios.patch(CONFIRM_RESET_PASSWORD_URL, params, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            console.log(JSON.stringify(response?.data));
            if (response?.data?.messages === "Change password successfully") {
                setPassword('');
                setMatchPwd('');

                navigate("/login");
            }

        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            }
            errRef.current.focus();
        }
    }


    return (
        <ThemeProvider theme={defaultTheme}>
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
                        Reset Password
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <Grid container spacing={2}>
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
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2, padding: '14px' }}
                            disabled={!validPassword || !validMatch ? true : false}
                        >
                            Submit new password
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}

export default ConfirmResetPassword;