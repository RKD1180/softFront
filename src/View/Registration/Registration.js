import React, { useState } from "react";
import Container from "@mui/material/Container";
import { Alert, Box, Button, CircularProgress, Paper } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const Registration = () => {
  const { register, handleSubmit, reset } = useForm();
  const [success, setSuccess] = useState("");
  const [load, setLoad] = useState(false);

  const onSubmit = (data) => {
    setLoad(true);
    setSuccess("");
    try {
      fetch(`https://dry-gorge-75292.herokuapp.com/users`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data?.insertedId) {
            setSuccess("Sign Up Successfull....");
            setLoad(false);
            reset();
          }
        });
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Container>
      <Box sx={{ display: "flex", justifyContent: "center", mb: 5 }}>
        <Paper elevation={3} sx={{ p: 10, mt: 5, minWidth: "25%" }}>
          <h2>Sign Up</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box>
              <TextField
                id="outlined-basic"
                label="Name"
                variant="outlined"
                type={"text"}
                fullWidth
                name="name"
                {...register("name")}
              />
            </Box>
            <Box sx={{ mt: 3 }}>
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
              Submit
            </Button>
          </form>
          <p>
            Existing user please <span></span>
            <Link to="/" style={{ fontWeight: "bold" }}>
              Login
            </Link>
          </p>
          {success && <Alert severity="success">{success}</Alert>}
        </Paper>
      </Box>
    </Container>
  );
};

export default Registration;
