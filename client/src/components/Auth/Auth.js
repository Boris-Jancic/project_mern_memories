import React, {useState} from 'react';
import {Avatar, Button, Container, Grid, Paper, TextField, Typography} from '@material-ui/core'
import { GoogleLogin } from 'react-google-login'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import useStyles from './styles'
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";

import Input from "./Input";
import Icon from "./icon";
import { signin, signup } from '../../actions/auth'

const initialState = { firstName:'', lastName:'', email:'', password:'', confirmPassword:''}

const Auth = () => {
    const classes = useStyles()
    const [isSignup, setIsSignup] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState(initialState);
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault() // Prevents page from refreshing
         console.log(formData)
        if (isSignup) {
            dispatch(signup(formData, navigate))
        } else {
            dispatch(signin(formData, navigate))
        }
    }

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const googleSuccess = async (res) => {
        console.log("Google sign in successful")
        const result = res?.profileObj
        const token = res?.tokenId

        try {
            dispatch({type: 'AUTH', data: {result, token}})
            navigate("/")
        } catch (e) {
            console.log(e)
        }

    }

    const googleFailure = (error) => {
        console.log("Google sign in was unsuccessful")
        console.log(error)
    }

    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup)
        setShowPassword(false)
    }

    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword)

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant="h5">
                    {isSignup? 'Sign up' : 'Sign in'}
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        { isSignup && (
                            <>
                                <Input name="firstName" label="First name" handleChange={handleChange} half />
                                <Input name="lastName" label="Last name" handleChange={handleChange} half />
                            </>
                        )}
                        <hr />
                        <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                        <hr />
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
                        <hr />
                        { isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" /> }
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit} >
                        { isSignup ? 'Sign up' : 'Sign in'}
                    </Button>
                    <GoogleLogin
                        clientId="404154685178-uibtlpnqo7mutvkmsftvg700k3ctfq2d.apps.googleusercontent.com"
                        render={(renderProps) => (
                            <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
                                Google Sign In
                            </Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy="single_host_origin"
                    />
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Button  onClick={switchMode} >
                                {isSignup ? 'Already have an account? Sign In!' : 'Dont have an account? Sign Up!'}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
};

export default Auth;
