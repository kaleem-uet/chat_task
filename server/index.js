import express from 'express';
import bcrypt from 'bcrypt';
import User from './models/User.js';
import http from 'http';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import cors from 'cors'
// Create an Express application instance
const app = express();
app.use(cors());
// Middleware to parse JSON bodies
app.use(express.json());

const server = http.createServer(app);



const io = new Server(server, {
  cors: {
    origin: "*",  // Adjust this to be more restrictive based on your needs
    methods: ["GET", "POST"]
  }
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// -------------------AUTH API ---------------------

// REGISTER
app.post("/register", async (req, res) => {
  try {
    // Check if email already exists in the database
    const existingEmail = await User.findOne({ email: req.body.email });
    if (existingEmail) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    // Check if username already exists in the database
    const existingUsername = await User.findOne({ username: req.body.username });
    if (existingUsername) {
      return res.status(400).json({
        message: "Username already exists",
      });
    }

    // Generate new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Create new user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    // Save user and respond
    const user = await newUser.save();
    res.status(200).json({
      user,
      message: "Registered successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
});



// LOGIN
app.post("/login", async (req, res) => {
  try {
    // Find the user by userName
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      // User not found
      return res.status(404).json({ message: "User not found" });
    }

    // Compare passwords
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
      // Incorrect password
      return res.status(400).json({ message: "Incorrect password" });
    }

    // Successful login
    res.status(200).json({ message: "Login successful", user });
  } catch (err) {
    // Server error
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// get all users 
app.get('/users', async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json({ message: "Success", users });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});


// -----------------------------CHAT API ---------------------------------//

// user connection to the chat 
let users=[]
io.on('connection', (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`)
//sends the message to all the users on the server
socket.on('message', (data) => {
  io.emit('messageResponse', data);
  console.log(data);
});

socket.on('typing', (data) => socket.broadcast.emit('typingResponse', data));

socket.on('newUser',(data)=>{
  users.push(data)
  console.log(users)
  socket.emit('newUserResponse',users)
})
  socket.on('disconnect', () => {
    console.log('🔥: A user disconnected');
    //Updates the list of users when a user disconnects from the server
    users = users.filter((user) => user.socketID !== socket.id);
    io.emit('newUserResponse',users)
    socket.disconnect();
  });
});














// ---------------DB CONNECTION -----------------------------//
mongoose.connect('mongodb+srv://kaleemullahk989:khan12@cluster0.wigxtls.mongodb.net/')
    .then(() => {
        console.log('MongoDB Connected...')
    }).catch((err) => {
        console.log('Error while Mongo Conn..', err);
    })
    
server.listen(3000, () => {
  console.log('Server is running on port 3000');
});
