import React,{useState, useRef} from "react";
import { TextField, Button, Box, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton } from "@mui/material";
import { Navigate } from "react-router-dom";
import alert from "../utility/alert";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Link } from "react-router-dom";

const RegisterPage = () => {
  const [redirect, setRedirect] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const name = useRef();
  const phone = useRef();
  const email = useRef();
  const username = useRef();
  const password = useRef();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();

    const nameVal = name.current.value;
    const phoneVal = Number(phone.current.value);
    const usernameVal = username.current.value;
    const passwordVal = password.current.value;
    const emailVal = email.current.value;

    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/v1/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: nameVal,
        phone: phoneVal,
        email: emailVal,
        username: usernameVal,
        password: passwordVal
      })
    });
    const data = await response.json();
    if (response.ok) {
      alert('You have registered successfully!', 'success');
      setTimeout(() => {
        alert('Now you can Login using Username and Password', 'success');
      }, 2000);
      setRedirect(true);
    } else {
      alert(data.error, 'error');
    }
  };

  if (redirect) {
    return <Navigate to={'/login'} />;
  }

  return (
    <div className="register-page">
      <div className="register-container">
        <div className="register-form">
          <img src="TAB LOGO.png" alt="" />
          <h1>Sign Up</h1>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              id="outlined-basic"
              label="User Name"
              variant="outlined"
              inputRef={username}
              required
              autoComplete='true'
            />
            <FormControl sx={{ marginTop: '10px', width: '100%' }} 
            variant="outlined"
             required 
             
              >
              <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"

                type={showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                inputRef={password}
                label="Password"
              />
            </FormControl>

            <TextField
              fullWidth
              id="outlined-basic"
              label="Full Name"
              variant="outlined"
              inputRef={name}
              required
              autoComplete='true'
              sx={{ marginTop: "10px" }}
            />
            <TextField
              fullWidth
              id="outlined-basic"
              label="Email"
              variant="outlined"
              inputRef={email}
              required
              autoComplete='true'
              sx={{ marginTop: "10px" }}
            />
            <TextField
              fullWidth
              id="outlined-basic"
              label="Phone Number"
              variant="outlined"
              type="number"
              inputRef={phone}
              required
              autoComplete='true'
              sx={{
                marginTop: "10px",

              }}
            />
            <div className="button1">
              <Button
                variant="contained"
                sx={{
                  fontSize: "16px",
                  marginTop: "10px",
                  width: "100%",
                  backgroundColor: "rgb(153,50,204)",
                }}

                type="submit"
              >
                Sign Up
              </Button>
              
            </div>

            <div id="login-link">
          Already have an account? <Link to="/login"><div className="login-btn">Login</div></Link>
        </div>
          </form>

        </div>

      </div>

    </div>


  );
};

export default RegisterPage;

