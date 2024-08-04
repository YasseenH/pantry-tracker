import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { firestore } from "@/firebase";
import { collection, getDocs, query } from "firebase/firestore";

const Overview = () => {
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    const fetchInventory = async () => {
      const snapshot = query(collection(firestore, "inventory"));
      const docs = await getDocs(snapshot);
      const inventoryList = docs.docs.map((doc) => ({
        name: doc.id,
        ...doc.data(),
      }));
      setInventory(inventoryList);
    };

    fetchInventory();
  }, []);

  return (
    <Box
      height={700}
      border="1px solid #388e3c"
      padding={3}
      borderRadius={10}
      bgcolor="#a5d6a7"
      color={"#1b5e20"}
      overflow={"auto"}
    >
      <Typography
        variant="h4"
        textAlign="center"
        color="#1b5e20"
        marginBottom={4}
        sx={{ fontSize: "3rem", fontFamily: "Pacifico, cursive" }}
      >
        Inventory Overview
      </Typography>
      {inventory.length > 0 ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell
                  align="center"
                  sx={{ fontWeight: "bold", color: "#2e7d32" }}
                >
                  Item
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ fontWeight: "bold", color: "#2e7d32" }}
                >
                  Quantity
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {inventory.map((item) => (
                <TableRow key={item.name}>
                  <TableCell align="center" sx={{ color: "#2e7d32" }}>
                    {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                  </TableCell>
                  <TableCell align="center" sx={{ color: "#2e7d32" }}>
                    {item.quantity}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography
          textAlign="center"
          margin={"200px"}
          variant="h2"
          color="#1b5e20"
        >
          No items in inventory.
        </Typography>
      )}
    </Box>
  );
};

export default Overview;
