import { useState } from "react";
import {
  Drawer,
  IconButton,
  List,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  AppBar,
  Toolbar,
  Typography,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate, useLocation } from "react-router-dom";
import { AutoAwesome, AutoFixHigh, Logout, Help } from "@mui/icons-material";

interface Props {
  onLogout: () => void;
}

const menuItems = [
  { text: "Enhance", icon: <AutoFixHigh />, path: "/" },
  { text: "Generate", icon: <AutoAwesome />, path: "/generate" },
  { text: "Help", icon: <Help />, path: "/help" },
];

export function Navigation({ onLogout }: Props) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const currentItem = menuItems.find((item) => item.path === location.pathname);
  const currentTabName = currentItem?.text || "Webflow Extension";

  const handleNavigation = (path: string) => {
    navigate(path);
    setDrawerOpen(false);
  };

  const handleLogoutClick = () => {
    setLogoutDialogOpen(true);
    setDrawerOpen(false);
  };

  const handleLogoutConfirm = () => {
    onLogout();
    setLogoutDialogOpen(false);
  };

  const handleLogoutCancel = () => {
    setLogoutDialogOpen(false);
  };

  return (
    <div>
      <AppBar
        position="static"
        sx={{
          borderBottom: 1,
          borderColor: "grey.200",
        }}
        elevation={0}
      >
        <Toolbar sx={{ position: "relative" }}>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => setDrawerOpen(true)}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h4"
            component="div"
            sx={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            {currentTabName}
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <List sx={{ width: 250 }}>
          {menuItems.map((item) => (
            <ListItemButton
              key={item.path}
              onClick={() => handleNavigation(item.path)}
              selected={location.pathname === item.path}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          ))}

          <Divider sx={{ my: 1 }} />

          <ListItemButton onClick={handleLogoutClick}>
            <ListItemIcon>
              <Logout sx={{ color: "warning.main" }} />
            </ListItemIcon>
            <ListItemText
              primary="Clear API Key"
              primaryTypographyProps={{
                color: "warning.main",
                fontSize: "0.9rem",
              }}
            />
          </ListItemButton>
        </List>
      </Drawer>

      {/* Logout Confirmation Dialog */}
      <Dialog
        open={logoutDialogOpen}
        onClose={handleLogoutCancel}
        aria-labelledby="logout-dialog-title"
        aria-describedby="logout-dialog-description"
      >
        <DialogTitle id="logout-dialog-title">Clear API Key?</DialogTitle>
        <DialogContent>
          <DialogContentText id="logout-dialog-description">
            This will clear your stored API key and return you to the setup
            screen. You'll need to enter your API key again to continue using
            the extension.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleLogoutCancel} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleLogoutConfirm}
            color="warning"
            variant="contained"
          >
            Clear Key
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
