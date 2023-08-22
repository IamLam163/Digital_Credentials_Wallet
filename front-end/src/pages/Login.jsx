import "./Login.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  // const { id } = useParams();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = data;

    try {
      // const response = await axios.post( 'https://digital-credentials-wallet-git-latest-iamlam163.vercel.app/login'|| 'http://localhost:7000/login', { email, password });
      // const response = await axios.post('http://localhost:7000/login', { email, password });
      setLoading(true);
      const response = await axios.post(
        "https://digital-wallet.onrender.com/login",
        { email, password },
      );
      const { data: responseData } = response;
      console.log("Response Data:", responseData);
      if (responseData.error) {
        toast.error(responseData.error);
      } else {
        setData({ email: "", password: "" });
        setLoading(false);
        console.log("Authenticated User:", responseData.user);
        localStorage.setItem("responseData", responseData);
        toast.success("Login Successful");
        console.log("User_Id:", responseData.user.id);
        navigate("/dashboard");
        // navigate(`/dashboard/${responseData.user.id}`);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const defaultTheme = createTheme();

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={data.email}
              onChange={handleInputChange}
              placeholder="Enter your Email address"
              className="signin-input"
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
              value={data.password}
              onChange={handleInputChange}
              placeholder="Enter your password"
              className="signin-input"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              className="signin-button"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>

            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/register" variant="body2">
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
