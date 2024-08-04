"use client";
import React from "react";
import { Box, Typography, Paper } from "@mui/material";
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

const About = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box
        width="100vw"
        height="100vh"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        bgcolor="background.default"
        padding={2}
      >
        <Paper
          elevation={3}
          sx={{ padding: 4, maxWidth: 800, borderRadius: 16 }}
        >
          <Typography
            variant="h2"
            fontFamily="Pacifico, cursive"
            color="primary.main"
            gutterBottom
          >
            About Pantry Tracker
          </Typography>
          <Typography variant="body1" color="text.primary" paragraph>
            Welcome to Pantry Tracker, your ultimate solution for managing your
            pantry inventory efficiently. Our application helps you keep track
            of all your pantry items, ensuring you never run out of essential
            ingredients.
          </Typography>
          <Typography variant="body1" color="text.primary" paragraph>
            With Pantry Tracker, you can:
          </Typography>
          <Typography
            variant="body1"
            paddingLeft={3}
            color="text.primary"
            component="ul"
          >
            <li>Add and remove items with ease</li>
            <li>Track low stock items to stay ahead of your needs</li>
            <li>Search and filter your inventory quickly</li>
            <li>Find recipes that match your inventory</li>
          </Typography>
          <Typography
            variant="body1"
            paddingTop={2}
            color="text.primary"
            paragraph
          >
            Our goal is to make your pantry management hassle-free and
            efficient, giving you more time to focus on what matters most -
            cooking and enjoying your meals!
          </Typography>
          <Typography variant="body1" color="text.primary">
            Thank you for using Pantry Tracker. We hope it brings as much
            convenience to your kitchen.
          </Typography>
        </Paper>
      </Box>
    </ThemeProvider>
  );
};

export default About;
