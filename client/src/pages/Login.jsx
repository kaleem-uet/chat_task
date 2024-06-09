import React, { useState } from 'react';
import { Box, Link, OutlinedInput, styled, Typography, Container, Button } from "@mui/material";
import { colorObject } from '../Theme/customColors';
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';

function Login({socket}) {
  const Navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [values, setValues] = useState({
    username: "",
    password: ""
  });
  const [errors, setErrors] = useState({
    username: "",
    password: ""
  });

  const handleClickShowPassword = (event) => {
    event.preventDefault(); // Prevent the form from submitting
    setShowPassword((show) => !show);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      try {
        setLoading(true); // Set loading to true
        
        // Send POST request to login user
        const response = await axios.post("http://localhost:3000/login", {
          username: values.username,
          password: values.password
        });
        // Log response from the server
        console.log(response.data);
        localStorage.setItem('userName', response.data.user.username);
        socket.emit('newUser',{userName:response.data.user.username, socketID:socket.id})
        // Optionally, redirect the user to chat page after successful login
        Navigate("/chat");
      } catch (error) {
        console.error("Error logging in:", error);
      } finally {
        setLoading(false); // Set loading to false after request completes
      }
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      username: "",
      password: ""
    };

    // Username validation
    if (!values.username.trim()) {
      newErrors.username = "Username is required";
      valid = false;
    } 

    // Password validation
    if (!values.password.trim()) {
      newErrors.password = "Password is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  return (
    <Container sx={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: 10 }}>
      <CustomBox>
        <CustomTypo variant="h3">Login</CustomTypo>
        <CustomSubTypo variant="subtitle1" color={colorObject.textColor2}>
          Please Login using account detail below.
        </CustomSubTypo>
        <form onSubmit={handleSubmit}>
          <CustomInput
            placeholder="Username"
            type="text"
            fullWidth
            color={"primary"}
            value={values.username}
            onChange={handleInputChange}
            name="username"
          />
          <Typography variant="body2" color="error">
            {errors.username}
          </Typography>
          <CustomInput
            placeholder="Password"
            type={showPassword ? 'text' : 'password'}
            fullWidth
            value={values.password}
            onChange={handleInputChange}
            name="password"
          />
          
          <CustomLink
            component="button"
            variant="subtitle2"
            underline="hover"
            onClick={handleClickShowPassword}
          >
           {showPassword ? "Hide Password" : "Show Password"}
          </CustomLink>

          <Typography variant="body2" color="error">
            {errors.password}
          </Typography>

          <CustomBtn type="submit">
            {loading ? <CircularProgress size={24} color="inherit" /> : <CustomTypo2 variant="h5" color={colorObject.white}>Login</CustomTypo2>}
          </CustomBtn>
        </form>
        
        <CreateAccContainer>
          <CustomSubTypo variant="subtitle2" color={colorObject.textColor2}>
            Don't have an account?
          </CustomSubTypo>
          <CustomLink
            component="button"
            variant="subtitle2"
            underline="hover"
            onClick={() => {
              Navigate("/");
            }}
          >
            Register
          </CustomLink>
        </CreateAccContainer>
      </CustomBox>
    </Container>
  );
}

const CustomBox = styled(Box)(({ theme }) => ({
  width: 544,
  height: 474,
  backgroundColor: theme.palette.primary.whiteColor,
  boxShadow: `0px 0px 25px 10px #F8F8FB`,
  display: "flex",
  padding: 30,
  flexDirection: "column",
  [theme.breakpoints.down("md")]: {
    width: "100%",
  },
}));
const CustomTypo = styled(Typography)(({ theme, color }) => ({
  fontFamily: theme.typography.customFonts.JosefinSans,
  color: color,
  textAlign: "center",
  fontWeight: "800",
  lineHeight: 2,
}));
const CustomTypo2 = styled(Typography)(({ theme, color }) => ({
  fontFamily: theme.typography.customFonts.Lato,
  color: color,
  fontWeight: "600",
}));
const CustomSubTypo = styled(Typography)(({ theme, color }) => ({
  fontFamily: theme.typography.customFonts.Lato,
  color: color,
  textAlign: "center",
  fontWeight: "400",
  alignItems: "center",
}));
const CustomInput = styled(OutlinedInput)(({ theme }) => ({
  "&.MuiOutlinedInput-root": {
    marginTop: 30,
    padding: 0,
    borderRadius: 3,
  },
  "& .MuiOutlinedInput-input": {
    padding: 10,
    width: "100%",
    height: "100%",
    fontSize: "16px",
    color: colorObject.textColor2,
    borderWidth: 10,
    fontWeight: "400",
  },
}));
const CustomBtn = styled(Button)(({ theme }) => ({
  height: 40,
  marginTop: 20,
  width: "100%",
  backgroundColor: theme.palette.primary.main,
  borderRadius: 3,
  cursor: "pointer",
  color: theme.palette.primary.whiteColor,
  alignItems: "center",
  justifyContent: "center",
  display: "flex",
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
  },
}));
const CustomLink = styled(Link)(({ theme }) => ({
  color: colorObject.textColor2,
  "&:hover": {
    color: theme.palette.primary.main,
  },
}));
const CreateAccContainer = styled("div")(({ theme }) => ({
  marginTop: 15,
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
}));

export default Login;
