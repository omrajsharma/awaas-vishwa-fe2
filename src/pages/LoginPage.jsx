import React, {  useState } from "react";
import { UserContext } from "../context/UserContext";
import { TextField, Button,  Box, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton } from "@mui/material";
import alert from "../utility/alert";
import {Navigate}  from "react-router-dom";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Link } from "react-router-dom";

const LoginPage = () => {
  const {setUserInfo} = React.useContext(UserContext);
  const [redirect, setRedirect] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false); // State for password visibility
  const username = React.useRef();
  const password = React.useRef();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();

    const usernameVal = username.current.value;
    const passwordVal = password.current.value;

    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/v1/auth/login`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
        body: JSON.stringify({
        username: usernameVal,
        password: passwordVal
      }),
        credentials: 'include'   //fot storing cookies
    })
    const data = await response.json();
    if (response.ok){            //for checking working is okk or not
      alert(data.success, 'success')
      setUserInfo(data.data)
      setRedirect(true)

    } else{
      alert (data.error, 'error')
    } 
  }
  
  if (redirect){
    return <Navigate to={'/'}/>
}
  return (
    <div className="register-page">
      <div className="register-container">   
        <div className="register-form">
          <img src="TAB LOGO.png" alt="" />
          <h1>Log In</h1>
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
            <FormControl sx={{ marginTop: '10px', width: '100%' }} variant="outlined"
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
                        required  
                        autoComplete="true" 
                      />
                    </FormControl>
            <div className="button1">
              <Button
                variant="contained"
                sx={{
                  fontSize: "16px",
                  marginTop: "10px",
                  width: "100%",
                  // height: "35px"  ,             
                  backgroundColor: "rgb(153,50,204)",
                }}
                
                type="submit"
              >
                Log In
              </Button>
            </div>
           <div id="login-link">
           Create a new account? <Link to="/register"><div className="login-btn">Register</div></Link>
        </div>
          </form>
        </div>
        
      </div>

    </div>
  )
}

export default LoginPage
