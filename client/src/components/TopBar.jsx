import * as React from "react";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import { colorObject } from "../Theme/customColors";


function TopBar({ handleDrawerToggle, drawerWidth,socket }) {
  const [typingStatus, setTypingStatus] = React.useState('');
  React.useEffect(() => {
    socket.on('typingResponse', (data) => setTypingStatus(data));
  }, [socket]);

  return (
    <AppBar
      elevation={0}
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
      }}
    >
      <Toolbar sx={{ backgroundColor: "#343541", color: "white" ,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: "none" } }}
        >
          <MenuIcon />
        </IconButton>

        <Typography variant="h6" sx={{color:colorObject.GhostWhite}} >{typingStatus}</Typography>
        <Button variant="outlined" color="warning"
        onClick={()=>{
          localStorage.removeItem('userName');
          window.location.reload();
        }}
        >
          Log Out
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
