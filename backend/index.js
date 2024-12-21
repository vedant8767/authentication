import express from 'express'
import dotenv from 'dotenv';
import connectDB from './src/db/index.js';
import cors from 'cors'
import User from './models/User.js';

dotenv.config()

const app = express()

const PORT = process.env.PORT || 80001

//common middle ware
app.use(cors());
app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(express.static("public"))

connectDB()
.then(
    ()=>{
        app.listen(PORT,()=>{
            console.log(`server is running http://127.0.0.1:${PORT} `)
        })
    }
)
.catch((err)=>{
    console.log("mongodb connection error")
})

const ADMIN_CREDENTIALS = { username: 'admin', password: 'admin123' };

// Register User Route
app.post('/register', async (req, res) => {
    console.log("register user")
  const { name, phone, email } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ message: 'You are already registered!' });
    }

    const newUser = new User({ name, phone, email });
    await newUser.save();
    res.json({ message: 'User registered successfully!' });
  } catch (err) {
    res.status(500).json({ message: 'Error registering user!' });
  }
})

// Admin Login Route
app.post('/admin', async (req, res) => {
    
    const { username, password } = req.body;
    console.log(username, password);
  
    // Check if credentials match
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      try {
        const users = await User.find(); // Fetch all users
        return res.json({ success: true, message: 'Welcome Admin!', users });
      } catch (err) {
        console.error('Error fetching users:', err);
        return res.status(500).json({ success: false, message: 'Error fetching users!' });
      }
    } else {
      return res.json({ success: false, message: 'Invalid Credentials!' });
    }
  });
  

// app.post('/api/register', async (req, res) => {
//     const { username, password } = req.body;
//     try {
//       await User.create({ username, password });
//       res.status(201).json({ message: 'User registered successfully' });
//     } catch (error) {
//       res.status(500).json({ error: 'Error registering user' });
//     }
//   });

// app.get('/api/users', async (req, res) => {
//     const users = await User.find({});
//     res.status(200).json(users);
//   });
