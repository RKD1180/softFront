import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Button, Container } from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import AddProducts from "../../../componnent/PrivateRoute/AddProducts/AddProducts";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateProduct from "../../../componnent/UpdateProduct/UpdateProduct";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const Products = () => {
  const [products, setProducts] = useState([]);
  const [openAddProduct, setOpen] = React.useState(false);
  const handleAddProductOpen = () => setOpen(true);
  const handleAddProductClose = () => setOpen(false);

  const [openUpdateProduct, setUpdateOpen] = React.useState(false);
  const handleUpdateProductOpen = () => setUpdateOpen(true);
  const handleUpdateProductClose = () => setUpdateOpen(false);

  const [pdId, setPdId] = useState("");

  useEffect(() => {
    try {
      fetch(`https://dry-gorge-75292.herokuapp.com/products`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setProducts(data);
        });
    } catch (error) {
      alert(error.message);
    }
  }, []);

  const handleUpdate = (id) => {
    setPdId(id);
    handleUpdateProductOpen();
  };

  const handleDelete = (id) => {
    try {
      fetch(`https://dry-gorge-75292.herokuapp.com/products/${id}`, {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data?.deletedCount) {
            const afterDeleteData = products.filter((p) => p._id !== id);
            setProducts(afterDeleteData);
          }
        });
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Container>
      <Box sx={{ width: "70%" }}>
        <Box
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h2>Total Products : {products.length}</h2>
          <Box>
            <Button variant="contained" onClick={handleAddProductOpen}>
              <AddBoxIcon sx={{ mr: 2 }} />
              Add new Product
            </Button>
          </Box>
        </Box>
      </Box>
      <TableContainer component={Paper} sx={{ width: "70%" }}>
        <Table sx={{ width: "100%" }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Price</StyledTableCell>
              <StyledTableCell>Weight</StyledTableCell>
              <StyledTableCell>Color</StyledTableCell>
              <StyledTableCell>Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((row, id) => (
              <StyledTableRow key={id}>
                <StyledTableCell component="th" scope="row">
                  {row.productName}
                </StyledTableCell>
                <StyledTableCell>{row.Price}</StyledTableCell>
                <StyledTableCell>{row.Weight}</StyledTableCell>
                <StyledTableCell>{row.Color}</StyledTableCell>
                <StyledTableCell>
                  <Box>
                    <EditIcon
                      sx={{ mr: 2, color: "green", cursor: "pointer" }}
                      onClick={() => handleUpdate(row._id)}
                    />
                    <DeleteIcon
                      sx={{ color: "red", cursor: "pointer" }}
                      onClick={() => handleDelete(row._id)}
                    />
                  </Box>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <AddProducts
        openAddProduct={openAddProduct}
        handleAddProductClose={handleAddProductClose}
      ></AddProducts>

      <UpdateProduct
        openUpdateProduct={openUpdateProduct}
        handleUpdateProductClose={handleUpdateProductClose}
        id={pdId}
      ></UpdateProduct>
    </Container>
  );
};

export default Products;
