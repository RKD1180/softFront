import React, { useState } from "react";
import Container from "@mui/material/Container";
import { Alert, Box, Button, CircularProgress, Paper } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [load, setLoad] = useState(false);
  const navigate = useNavigate();

  const onSubmit = (data) => {
    setLoad(true);
    setSuccess("");
    setError("");
    try {
      fetch(`https://dry-gorge-75292.herokuapp.com/login`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data?.status === "error") {
            setError(data?.error);
            setLoad(false);
          } else {
            setSuccess(data?.status);
            setLoad(false);
            localStorage.setItem("user", JSON.stringify(data?.user));
            navigate("/dashboard");
          }
        });
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Container>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Paper elevation={3} sx={{ p: 10, mt: 5, minWidth: "25%" }}>
          <h2>Login</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box>
              <TextField
                id="outlined-basic"
                label="Email"
                variant="outlined"
                type={"email"}
                fullWidth
                name="email"
                {...register("email")}
              />
            </Box>
            <Box sx={{ mt: 3 }}>
              <TextField
                id="outlined-basic"
                label="Password"
                variant="outlined"
                type={"password"}
                fullWidth
                name="password"
                {...register("password")}
              />
            </Box>
            <Button type="submit" variant="contained" sx={{ mt: 2 }}>
              {load && (
                <CircularProgress size={15} sx={{ mr: 2 }} color="inherit" />
              )}
              Login
            </Button>
          </form>
          <p>
            New user please <span></span>
            <Link to="/signup" style={{ fontWeight: "bold" }}>
              Sign Up{" "}
            </Link>
          </p>
          {success && <Alert severity="success">{success}</Alert>}
          {error && <Alert severity="error">{error}</Alert>}
        </Paper>
      </Box>
    </Container>
  );
};

export default Login;
