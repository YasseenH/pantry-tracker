"use client";
import React from "react";
import { Box, Typography, CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Overview from "./components/Overview";
import LowStockItems from "./components/LowStockItems";
import NavBar from "./components/NavBar"; // Import NavBar
import "@fontsource/roboto"; // Import Roboto font
import "@fontsource/pacifico"; // Import a unique font

const theme = createTheme({
  palette: {
    primary: {
      main: "#388e3c",
    },
    background: {
      default: "#e8f5e9",
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
  },
});

export default function Home() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        padding={2}
        gap={2}
        height="100vh"
      >
        <Box
          display="flex"
          width="100%"
          justifyContent="space-between"
          padding={2}
          gap={2}
        >
          <Box
            flex={1}
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap={2}
          >
            <LowStockItems />
            <Box
              bgcolor="primary.main"
              padding={2}
              borderRadius={10}
              width="100%"
              height="100%"
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              textAlign="center"
            >
              <Typography
                sx={{ fontSize: "4rem", fontFamily: "Pacifico, cursive" }}
                variant="h1"
                color="white"
              >
                Welcome Back
              </Typography>
              <Typography
                sx={{ fontSize: "4rem", fontFamily: "Pacifico, cursive" }}
                variant="h1"
                color="white"
              >
                To
              </Typography>
              <Typography
                sx={{ fontSize: "4rem", fontFamily: "Pacifico, cursive" }}
                variant="h1"
                color="white"
              >
                Pantry Tracker
              </Typography>
            </Box>
          </Box>
          <Box flex={1}>
            <Overview />
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
