import React, { useEffect, useState } from "react";
import { Box, Typography, Grid } from "@mui/material";
import { firestore } from "@/firebase";
import { collection, getDocs, query } from "firebase/firestore";

const LowStockItems = () => {
  const [lowStockItems, setLowStockItems] = useState([]);

  useEffect(() => {
    const fetchInventory = async () => {
      const snapshot = query(collection(firestore, "inventory"));
      const docs = await getDocs(snapshot);
      const lowStockList = docs.docs
        .map((doc) => ({
          name: doc.id,
          ...doc.data(),
        }))
        .filter((item) => item.quantity < 5);
      setLowStockItems(lowStockList);
    };

    fetchInventory();
  }, []);

  return (
    <Box
      width={650}
      border="1px solid #388e3c"
      padding={2}
      borderRadius={10}
      bgcolor="#a5d6a7"
    >
      <Typography
        variant="h4"
        textAlign="center"
        color="#1b5e20"
        marginBottom={2}
        sx={{ fontSize: "2.5rem", fontFamily: "Pacifico, cursive" }}
      >
        Low Stock Items:
      </Typography>
      {lowStockItems.length > 0 ? (
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            {lowStockItems.map((item, index) => (
              <Grid item xs={6} md={index % 5 === 0 ? 8 : 4} key={index}>
                <Box
                  padding={1}
                  bgcolor="white"
                  borderRadius={5}
                  textAlign="center"
                  boxShadow={3}
                >
                  <Typography variant="h6" color="#2e7d32">
                    {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      ) : (
        <Typography textAlign="center" color="#2e7d32">
          No items low on stock.
        </Typography>
      )}
    </Box>
  );
};

export default LowStockItems;
