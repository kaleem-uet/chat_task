import * as React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";
import { InputBase, Paper, styled } from "@mui/material";

// Styled components
const FooterContainer = styled(Box)(({ theme }) => ({
  bottom: 10,
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#000",
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: "2px 4px",
  display: "flex",
  alignItems: "center",
  width: "80%",
  color: "white",
  backgroundColor: "#353740",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  flex: 1,
  color: "white",
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  padding: "10px",
}));

function Footer({ socket }) {
  const [message, setMessage] = React.useState('');
  const [typingTimeout, setTypingTimeout] = React.useState(null);

  const handleTyping = () => {
    // Emit typing event when user starts typing
    socket.emit('typing', `${localStorage.getItem('userName')} is typing`);
  };
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim() && localStorage.getItem('userName')) {
      socket.emit('message', {
        text: message,
        name: localStorage.getItem('userName'),
        id: `${socket.id}${Math.random()}`,
        socketID: socket.id,
      });
      socket.emit('stop typing', `${localStorage.getItem('userName')} stopped typing`);
      clearTimeout(typingTimeout);
      setTypingTimeout(null);
    }
    setMessage('');
  };

  const handleKeyDown = (e) => {
    // Check if "Enter" key is pressed
    if (e.key === 'Enter') {
      handleSendMessage(); // Call handleSendMessage function
    } else {
      handleTyping(); // Call handleTyping function for other keys
    }
  };
  return (
    <FooterContainer>
      <StyledPaper component="form" onSubmit={handleSendMessage}>
        <StyledInputBase
          multiline
          placeholder="Type your message"
          inputProps={{ "aria-label": "type your message" }}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
         
          onKeyDown={handleKeyDown}
        />
        <StyledIconButton type="submit" color="primary" aria-label="send message">
          <SendIcon />
        </StyledIconButton>
      </StyledPaper>
    </FooterContainer>
  );
}

export default Footer;
