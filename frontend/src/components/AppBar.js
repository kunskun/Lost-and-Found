import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import CottageIcon from "@mui/icons-material/Cottage";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ToggleButton from "@mui/material/ToggleButton";
import { useState } from "react";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import { LoginProvider, useLogin } from "../contexts/LoginContext";
import { useNavigate } from "react-router-dom";

export default function NavBar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [language, setLanguage] = useState(true);
  const {login} = useLogin();
  const {navigate} = useNavigate();

  const isMenuOpen = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
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
      PaperProps={{
        elevation: 0,
        sx: {
          overflow: "visible",
          filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
          mt: 1.5,
          "& .MuiAvatar-root": {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
          },
          "&:before": {
            content: '""',
            display: "block",
            position: "absolute",
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            bgcolor: "background.paper",
            transform: "translateY(-50%) rotate(45deg)",
            zIndex: 0,
          },
        },
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
    </Menu>
  );

  if(!login) {return null}
  return (
    <LoginProvider>
      <Box sx={{ flexGrow: 1, pb: 1 }}>
        <AppBar position="menu" sx={{ bgcolor: "black", height: 80 }}>
          <Toolbar>
            <a href="/" style={{ textDecoration: "none", color: "#ffffff" }}>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="home"
                sx={{ mr: 2 }}
              >
                <CottageIcon fontSize="large" />
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
              <PopupState variant="popover" popupId="demo-popup-menu">
                {(popupState) => (
                  <React.Fragment>
                    <IconButton
                      size="large"
                      edge="end"
                      aria-label="account of current user"
                      aria-controls={menuId}
                      aria-haspopup="true"
                      onClick={handleMenuOpen}
                      color="inherit"
                    >
                      <Typography
                        fontSize={20}
                        noWrap
                        component="div"
                        sx={{
                          mr: 1,
                          justifyItem: "center",
                          display: { xs: "none", sm: "block" },
                        }}
                        {...bindTrigger(popupState)}
                      >
                        Username
                      </Typography>
                      <AccountCircleOutlinedIcon fontSize="large" />
                      <Menu {...bindMenu(popupState)}>
                        <MenuItem onClick={popupState.close}>Logout</MenuItem>
                      </Menu>
                    </IconButton>
                  </React.Fragment>
                )}
              </PopupState>
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
      </Box>
    </LoginProvider>
  );
}
