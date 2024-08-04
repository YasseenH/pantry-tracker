import React from "react";
import Link from "next/link";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";

const NavBar = () => {
  return (
    <AppBar position="static" sx={{ bgcolor: "#388e3c" }}>
      <Toolbar>
        <Typography
          variant="h4"
          component="div"
          sx={{
            flexGrow: 1,
            fontSize: "2rem",
            fontFamily: "Pacifico, cursive",
          }}
        >
          Pantry Tracker
        </Typography>
        <Box>
          <Button color="inherit" component={Link} href="/">
            Home
          </Button>
          <Button color="inherit" component={Link} href="/inventory">
            Inventory
          </Button>
          <Button color="inherit" component={Link} href="/recipes">
            Recipes
          </Button>
          <Button color="inherit" component={Link} href="/about">
            About
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
