"use client";
import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Checkbox,
  FormControlLabel,
  Paper,
  Stack,
} from "@mui/material";
import { firestore } from "@/firebase";
import { collection, getDocs, query } from "firebase/firestore";
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

const Recipes = () => {
  const [inventory, setInventory] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInventory = async () => {
      const snapshot = query(collection(firestore, "inventory"));
      const docs = await getDocs(snapshot);
      const inventoryList = [];
      docs.forEach((doc) => {
        inventoryList.push(doc.id);
      });
      setInventory(inventoryList);
    };

    fetchInventory();
  }, []);

  const handleSelectAll = () => {
    if (selectedItems.length === inventory.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems([...inventory]);
    }
  };

  const handleItemChange = (item) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter((i) => i !== item));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const handleGetRecipes = async () => {
    try {
      setError(null);
      const response = await fetch(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENROUTER_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "meta-llama/llama-3-8b-instruct:free",
            messages: [
              {
                role: "user",
                content:
                  "Using the following ingredients: " +
                  selectedItems.join(", ") +
                  ", what can I make? Give me step by step instructions and measurements",
              },
            ],
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      const recipeSuggestions = data.choices[0].message.content;

      // Parse the response into an array of recipes
      const parsedRecipes = recipeSuggestions.split("\n").map((recipe) => {
        const [name, ...instructions] = recipe.split(": ");
        return { name, instructions: instructions.join(": ") };
      });

      setRecipes(parsedRecipes);
    } catch (error) {
      setError(error.message);
      console.error(error);
      setRecipes([]); // Ensure recipes is set to an array
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        width="100vw"
        height="110vh"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        bgcolor="background.default"
        padding={2}
      >
        <Paper elevation={3} sx={{ padding: 4, maxWidth: 800 }}>
          <Typography
            variant="h2"
            fontFamily="Pacifico, cursive"
            color="primary.main"
            gutterBottom
          >
            Find Recipes
          </Typography>
          <Typography variant="body1" color="text.primary" paragraph>
            Select items from your pantry to find recipes you can make. Click
            "Select All" to choose all items, and "Get Recipes" to fetch recipe
            suggestions.
          </Typography>

          <Button
            variant="contained"
            color="primary"
            onClick={handleSelectAll}
            sx={{ marginBottom: 2 }}
          >
            {selectedItems.length === inventory.length
              ? "Deselect All"
              : "Select All"}
          </Button>

          <Box
            sx={{
              width: "100%",
              maxHeight: 300,
              overflowY: "auto",
              padding: 2,
              border: "1px solid #388e3c",
              borderRadius: 2,
              marginBottom: 2,
            }}
          >
            <Stack spacing={1}>
              {inventory.map((item) => (
                <FormControlLabel
                  key={item}
                  control={
                    <Checkbox
                      checked={selectedItems.includes(item)}
                      onChange={() => handleItemChange(item)}
                      color="primary"
                    />
                  }
                  label={item.charAt(0).toUpperCase() + item.slice(1)}
                />
              ))}
            </Stack>
          </Box>

          <Button
            variant="contained"
            color="secondary"
            onClick={handleGetRecipes}
            sx={{ marginBottom: 2 }}
          >
            Get Recipes
          </Button>

          {error && (
            <Typography color="error" sx={{ marginBottom: 2 }}>
              {error}
            </Typography>
          )}

          {recipes.length > 0 && (
            <Box
              sx={{
                width: "100%",
                maxHeight: 300,
                overflowY: "auto",
                padding: 2,
                border: "1px solid #388e3c",
                borderRadius: 2,
              }}
            >
              <Typography variant="h4" color="primary.main" gutterBottom>
                Recipe
              </Typography>
              {recipes.map((recipe, index) => (
                <Box key={index} sx={{ marginBottom: 2 }}>
                  <Typography variant="h6" color="text.primary">
                    {recipe.name}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {recipe.instructions}
                  </Typography>
                </Box>
              ))}
            </Box>
          )}
        </Paper>
      </Box>
    </ThemeProvider>
  );
};

export default Recipes;
