import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import CottageIcon from "@mui/icons-material/Cottage";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ToggleButton from "@mui/material/ToggleButton";
import { Link } from "@mui/material";

export default function NavBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [language, setLanguage] = React.useState(true);

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ bgcolor: "black", height: 70 }}>
        <Toolbar>
          <a href="/" style={{textDecoration: 'none', color: '#ffffff'}}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="home"
              sx={{ mr: 2 }}
              >
              <CottageIcon />
              <Typography
                  variant="h5"
                  noWrap
                  component="div"
                  sx={{
                    mx: 2,
                    justifyItem: "center",
                    display: { xs: "none", sm: "block" },
                  }}
                  >
                  Lost & Found
                </Typography>
            </IconButton>
          </a>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
              >
              <Typography
                fontSize={20}
                noWrap
                component="div"
                sx={{
                  mr: 2,
                  justifyItem: "center",
                  display: { xs: "none", sm: "block" },
                }}
              >
                Username
              </Typography>
              <AccountCircleOutlinedIcon />
            </IconButton>
            <Box
              sx={{
                p: 2,
                justifyItem: "center",
                display: { xs: "none", md: "flex" },
              }}
            >
              <ToggleButton
                value="th"
                selected={language}
                sx={{ border: "none", backgroundColor: "" }}
                color="primary"
                onClick={() => {
                  setLanguage(true);
                }}
              >
                <Typography
                  noWrap
                  component="div"
                  fontSize="20"
                  sx={{
                    color: "white",
                    display: {
                      xs: "none",
                      sm: "block",
                      fontWeight: language === true ? "bold" : "regular",
                    },
                  }}
                >
                  TH
                </Typography>
              </ToggleButton>
              <Typography
                variant="h5"
                noWrap
                component="div"
                sx={{
                  py: 1,
                  display: { xs: "none", sm: "block", fontWeight: "bold" },
                }}
                align="center"
              >
                |
              </Typography>
              <ToggleButton
                value="en"
                selected={language}
                sx={{ border: "none", backgroundColor: "" }}
                color="primary"
                onClick={() => {
                  setLanguage(false);
                }}
              >
                <Typography
                  noWrap
                  component="div"
                  fontSize="20"
                  sx={{
                    color: "white",
                    display: {
                      xs: "none",
                      sm: "block",
                      fontWeight: !language === true ? "bold" : "regular",
                    },
                  }}
                >
                  EN
                </Typography>
              </ToggleButton>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </Box>
  );
}
