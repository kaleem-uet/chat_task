import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Paper, styled } from "@mui/material";
import { colorObject } from "../Theme/customColors";

// Styled components
const ChatContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '80vh',
  padding: '20px',
  overflowY: 'scroll'
}));

const ChatBox = styled(Box)(({ theme }) => ({
  marginBottom: '10px'
}));

const ChatSender = styled(Paper)(({ theme }) => ({
  backgroundColor: colorObject.chatYou,
  width: '300px',
  padding: '10px',
  borderRadius: '10px',
  marginLeft: 'auto',
  fontSize: '15px',
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    marginLeft: '0'
  }
}));

const ChatRecipient = styled(Paper)(({ theme }) => ({
  backgroundColor: colorObject.chatSend,
  width: '300px',
  padding: '10px',
  borderRadius: '10px',
  fontSize: '15px',
  [theme.breakpoints.down('sm')]: {
    width: '100%'
  }
}));

const SenderText = styled(Typography)(({ theme }) => ({
  textAlign: 'right',
  display: 'block'
}));

function ChatBody({messages,lastMessageRef}) {
  return (
    <>
      <ChatContainer>
      {messages.map((message) =>
          message.name === localStorage.getItem('userName') ? (
            <ChatBox key={message.id}>
          <SenderText variant="caption">
            You
          </SenderText>
          <ChatSender>
          {message.text}
          </ChatSender>
        </ChatBox>
          ) : (
            <ChatBox key={message.id}>
          <Typography variant="caption">{message.name}</Typography>
          <ChatRecipient>
            {message.text}
          </ChatRecipient>
        </ChatBox>
          )
        )}
        
        <div />
      </ChatContainer>
    </>
  );
}

export default ChatBody;
