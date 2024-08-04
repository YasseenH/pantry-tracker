"use client";
import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Modal,
  Stack,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { firestore } from "@/firebase";
import {
  collection,
  getDocs,
  query,
  getDoc,
  setDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "@fontsource/roboto";
import "@fontsource/pacifico";

const theme = createTheme({
  palette: {
    primary: {
      main: "#388e3c",
    },
    secondary: {
      main: "#a5d6a7",
    },
    background: {
      default: "#e8f5e9",
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
  },
});

export default function Inventory() {
  const [inventory, setInventory] = useState([]);
  const [filteredInventory, setFilteredInventory] = useState([]);
  const [open, setOpen] = useState(false);
  const [itemName, setItemName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const updateInventory = async () => {
    const snapshot = query(collection(firestore, "inventory"));
    const docs = await getDocs(snapshot);
    const inventoryList = [];
    docs.forEach((doc) => {
      inventoryList.push({
        name: doc.id,
        ...doc.data(),
      });
    });
    setInventory(inventoryList);
    setFilteredInventory(inventoryList);
  };

  const removeItem = async (item) => {
    const docRef = doc(collection(firestore, "inventory"), item);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const { quantity } = docSnap.data();
      if (quantity === 1) {
        await deleteDoc(docRef);
      } else {
        await setDoc(docRef, { quantity: quantity - 1 });
      }
    }
    await updateInventory();
  };

  const addItem = async (item) => {
    const docRef = doc(collection(firestore, "inventory"), item);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const { quantity } = docSnap.data();
      await setDoc(docRef, { quantity: quantity + 1 });
    } else {
      await setDoc(docRef, { quantity: 1 });
    }
    await updateInventory();
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query === "") {
      setFilteredInventory(inventory);
    } else {
      const filtered = inventory.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredInventory(filtered);
    }
  };

  useEffect(() => {
    updateInventory();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Box
        width="100vw"
        height="100vh"
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap={2}
        padding={2}
        bgcolor="background.default"
      >
        <Modal open={open} onClose={handleClose}>
          <Box
            position="absolute"
            top="50%"
            left="50%"
            width={400}
            bgcolor="background.default"
            border="2px solid"
            borderColor="primary.main"
            boxShadow={24}
            p={4}
            display="flex"
            flexDirection="column"
            gap={3}
            sx={{
              transform: "translate(-50%, -50%)",
            }}
          >
            <Typography variant="h6">Add Item</Typography>
            <Stack width="100%" direction="row" spacing={2}>
              <TextField
                variant="outlined"
                fullWidth
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
              />
              <Button
                variant="contained"
                onClick={() => {
                  addItem(itemName);
                  setItemName("");
                  handleClose();
                }}
              >
                Add
              </Button>
            </Stack>
          </Box>
        </Modal>

        <Box
          width={800}
          padding={2}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          bgcolor="primary.main"
          borderRadius={2}
          color="white"
        >
          <Typography paddingBottom={2} variant="h2" fontFamily="Pacifico, cursive">
            Inventory Items
          </Typography>
          <Button variant="contained" color="secondary" onClick={handleOpen}>
            Add New Item
          </Button>
        </Box>

        <TextField
          variant="outlined"
          fullWidth
          placeholder="Search items..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          sx={{ width: "800px", marginTop: 2 }}
        />

        <TableContainer
          component={Paper}
          sx={{ width: "800px", marginTop: 2, maxHeight: 500 }}
        >
          <Table stickyHeader>
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
                <TableCell
                  align="center"
                  sx={{ fontWeight: "bold", color: "#2e7d32" }}
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredInventory.map(({ name, quantity }) => (
                <TableRow key={name}>
                  <TableCell align="center" sx={{ color: "#2e7d32" }}>
                    {name.charAt(0).toUpperCase() + name.slice(1)}
                  </TableCell>
                  <TableCell align="center" sx={{ color: "#2e7d32" }}>
                    {quantity}
                  </TableCell>
                  <TableCell align="center">
                    <Stack direction="row" spacing={2} justifyContent="center">
                      <Button variant="contained" onClick={() => addItem(name)}>
                        Add
                      </Button>
                      <Button
                        variant="contained"
                        onClick={() => removeItem(name)}
                      >
                        Remove
                      </Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </ThemeProvider>
  );
}
