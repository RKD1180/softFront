import { Button, Container } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Container>
      <h2 sx={{ fontWeight: "bold" }}>No Page Found</h2>
      <Link to="/" style={{ textDecoration: "none" }}>
        <Button variant="contained">Back Login</Button>
      </Link>
    </Container>
  );
};

export default NotFound;
