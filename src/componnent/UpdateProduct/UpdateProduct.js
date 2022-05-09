import React, { useEffect, useState } from "react";

import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

import { useForm } from "react-hook-form";
import { Alert, Button, CircularProgress, TextField } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 5,
};

const modalStyle = {
  borderRadious: 10,
};

const UpdateProduct = ({ openUpdateProduct, handleUpdateProductClose, id }) => {
  const { register, handleSubmit } = useForm();
  const [success, setSuccess] = useState("");
  const [load, setLoad] = useState(false);
  const [getProduct, setGetProduct] = useState({});

  useEffect(() => {
    try {
      fetch(`https://dry-gorge-75292.herokuapp.com/products/${id}`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setGetProduct(data[0]);
        });
    } catch (error) {
      alert(error.message);
    }
  }, [id]);

  const onSubmit = (data) => {
    setLoad(true);
    setSuccess("");

    try {
      fetch(`https://dry-gorge-75292.herokuapp.com/products/${id}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((data) => {
          setLoad(false);
          if (data?.modifiedCount) {
            setSuccess("Product Update Successfully...");
          }
        });
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div>
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        open={openUpdateProduct}
        onClose={handleUpdateProductClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        sx={modalStyle}
      >
        <Box sx={style}>
          <h2>Update Product </h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ mt: 3 }}>
              <TextField
                id="outlined-basic"
                label="Product Name"
                variant="outlined"
                type={"text"}
                fullWidth
                name="productName"
                defaultValue={getProduct?.productName}
                {...register("productName")}
                required
              />
            </Box>

            <Box sx={{ mt: 3 }}>
              <TextField
                id="outlined-basic"
                label="Product Price"
                variant="outlined"
                type={"number"}
                fullWidth
                name="Price"
                defaultValue={getProduct?.Price}
                {...register("Price")}
                required
              />
            </Box>

            <Box sx={{ mt: 3 }}>
              <TextField
                id="outlined-basic"
                label="Weight"
                variant="outlined"
                type={"text"}
                fullWidth
                name="Weight"
                defaultValue={getProduct?.Weight}
                {...register("Weight")}
                required
              />
            </Box>

            <Box sx={{ mt: 3 }}>
              <TextField
                id="outlined-basic"
                label="Color"
                variant="outlined"
                type={"text"}
                fullWidth
                name="Color"
                defaultValue={getProduct?.Color}
                {...register("Color")}
                required
              />
            </Box>

            <Button type="submit" variant="contained" sx={{ mt: 2 }}>
              {load && (
                <CircularProgress size={15} sx={{ mr: 2 }} color="inherit" />
              )}
              Submit
            </Button>
          </form>
          {success && (
            <Alert severity="success" sx={{ mt: 3 }}>
              {success}
            </Alert>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default UpdateProduct;
