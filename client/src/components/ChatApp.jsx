import * as React from "react";
import PropTypes from "prop-types";
import CssBaseline from "@mui/material/CssBaseline";

import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Avatar, InputBase, Paper, useTheme, Box } from "@mui/material";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import { Stack } from "@mui/system";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import TopBar from "./TopBar";
import SideBar from "./SideBar";
import Footer from "./Footer";
import ChatBody from "./ChatBody";
import axios from "axios";
const drawerWidth = 300;

function ChatApp({ window, socket }) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [Users, setUsers] = React.useState([]);
  const [messages, setMessages] = React.useState([]);
  const lastMessageRef = React.useRef(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const theme = useTheme();

  React.useEffect(() => {
    axios
      .get("http://localhost:3000/users")
      .then((response) => {
        console.log(response.data);
        setUsers(response.data.users);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  React.useEffect(() => {
    socket.on('messageResponse', (data) => setMessages([...messages, data]));
  }, [socket, messages]);

  React.useEffect(() => {
    // 👇️ scroll to bottom every time messages change
    lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  const drawer = (
    <div style={{ padding: 10 }}>
      <Typography variant="h4">Chat App</Typography>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleClose}>Edit</MenuItem>
        <MenuItem onClick={handleClose}>Delete</MenuItem>
      </Menu>
      <List>
        {Users.map((data) => (
          <>
            <ListItem
              disablePadding
              sx={{
                mt: 2,
                padding: "5px",
                ":hover": { backgroundColor: "gray" },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  cursor: "pointer",
                  width: "100%",
                  gap: 2,
                }}
              >
                <ChatBubbleOutlineIcon color="primary" fontSize="14" />
                <Typography variant="h6">{data.username}</Typography>
              </Box>
            </ListItem>
          </>
        ))}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex", backgroundColor: "#000", color: "white" }}>
      <CssBaseline />
      <TopBar
        handleDrawerToggle={handleDrawerToggle}
        drawerWidth={drawerWidth}
        socket={socket}
      />
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <SideBar
          drawerWidth={drawerWidth}
          drawer={drawer}
          container={container}
          mobileOpen={mobileOpen}
          handleDrawerToggle={handleDrawerToggle}
        />
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          height: "100vh",
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <ChatBody 
         messages={messages}
         lastMessageRef={lastMessageRef}
        />

        <Footer theme={theme} socket={socket} />
      </Box>
    </Box>
  );
}

ChatApp.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default ChatApp;
