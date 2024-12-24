import express from 'express'
import dotenv from 'dotenv';
import connectDB from './src/db/index.js';
import cors from 'cors'
// import User from './models/User.js';
import { User, WinningCode } from './models/User.js';



dotenv.config()

const app = express()

const PORT = process.env.PORT || 80001

//common middle ware
app.use(cors());
app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(express.static("public"))

//if sucessfull connection then only listen no port
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
  const { name, phone, email,password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ message: 'You are already registered!' });
    }

    const newUser = new User({ name, phone, email,password });
    await newUser.save();
    res.json({ message: 'User registered successfully!' });
  } catch (err) {
    res.status(500).json({ message: 'Error registering user!' });
  }
})
// Login Route
app.post('/login', async (req, res) => {
  console.log("login user");
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ message: 'User not registered! Please register first.' });
    }

    // Compare passwords
    if (user.password !== password) {
      return res.json({ message: 'Wrong credentials! Please try again.' });
    }

    // On successful login
    res.json({ message: 'Login successful! Redirecting to labelcode.html...' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error during login!' });
  }
});

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
  

//   app.post('/validate-code', async (req, res) => {
//     const { userId, labelCode } = req.body;

//     try {
//         console.log(`Received request to validate code: ${labelCode} for user: ${userId}`);

//         // Find user by email
//         const user = await User.findOne({ email: userId });
//         if (!user) {
//             console.log('User not found');
//             return res.status(404).json({ message: 'User not found!' });
//         }

//         if (user.win) {
//             console.log('User already won');
//             return res.json({ message: 'You have already won!' });
//         }

//         // Retrieve all codes to ensure you're fetching the right ones
//         const allCodes = await WinningCode.find();
//         console.log('All available codes:', allCodes);

//         // Find an unused winning code
//         const code = await WinningCode.findOne({ code: labelCode, used: false });
//         if (!code) {
//             console.log('Invalid or already used code');
//             return res.json({ message: 'Invalid or already used code!' });
//         }

//         console.log(`Valid code: ${labelCode}, marking as used and updating user`);

//         // Mark the user as a winner and the code as used
//         user.win = true;
//         await user.save();

//         code.used = true;
//         await code.save();

//         res.json({ message: 'Congratulations! You are a winner!' });
//     } catch (err) {
//         console.error('Error validating code:', err);
//         res.status(500).json({ message: 'Error validating code!' });
//     }
// });
// app.post('/validate-code', async (req, res) => {
//   const { userId, labelCode } = req.body;

//   try {
//       console.log(`Received request to validate code: ${labelCode} for user: ${userId}`);

//       // Find user by email
//       const user = await User.findOne({ email: userId });
//       if (!user) {
//           console.log('User not found');
//           return res.status(404).json({ message: 'User not found!' });
//       }

//       // Check the number of attempts
//       if (user.attempts >= 3) {
//           console.log('User has reached the maximum number of attempts');
//           return res.json({ message: 'Maximum attempts reached! You cannot try again.' });
//       }

//       // If user has not reached 3 attempts, increment attempts
//       user.attempts += 1;
//       await user.save();

//       if (user.win) {
//           console.log('User already won');
//           return res.json({ message: 'You have already won!' });
//       }

//       // Retrieve all codes to ensure you're fetching the right ones
//       const allCodes = await WinningCode.find();
//       console.log('All available codes:', allCodes);

//       // Find an unused winning code
//       const code = await WinningCode.findOne({ code: labelCode, used: false });
//       if (!code) {
//           console.log('Invalid or already used code');
//           return res.json({ message: 'Invalid or already used code!' });
//       }

//       console.log(`Valid code: ${labelCode}, marking as used and updating user`);

//       // Mark the user as a winner and the code as used
//       user.win = true;
//       await user.save();

//       code.used = true;
//       await code.save();

//       res.json({ message: 'Congratulations! You are a winner!' });
//   } catch (err) {
//       console.error('Error validating code:', err);
//       res.status(500).json({ message: 'Error validating code!' });
//   }
// });
app.post('/validate-code', async (req, res) => {
  const { userId, labelCode } = req.body;

  try {
      console.log(`Received request to validate code: ${labelCode} for user: ${userId}`);

      // Find user by email
      const user = await User.findOne({ email: userId });
      if (!user) {
          console.log('User not found');
          return res.status(404).json({ message: 'User not found!' });
      }

      // If user has already won, prevent further attempts
      if (user.win) {
          console.log('User already won');
          return res.json({ message: 'You have already won!' });
      }

      // Check the number of attempts
      if (user.attempts >= 3) {
          console.log('User has reached the maximum number of attempts');
          return res.json({ message: 'Maximum attempts reached! You cannot try again.' });
      }

      // If user has not reached 3 attempts, increment attempts
      user.attempts += 1;
      await user.save();

      // Retrieve all codes to ensure you're fetching the right ones
      const allCodes = await WinningCode.find();
      console.log('All available codes:', allCodes);

      // Find an unused winning code
      const code = await WinningCode.findOne({ code: labelCode, used: false });
      if (!code) {
          console.log('Invalid or already used code');
          return res.json({ message: 'Invalid or already used code!' });
      }

      console.log(`Valid code: ${labelCode}, marking as used and updating user`);

      // Mark the user as a winner and the code as used
      user.win = true;
      await user.save();

      code.used = true;
      await code.save();

      res.json({ message: 'Congratulations! You are a winner!' });
  } catch (err) {
      console.error('Error validating code:', err);
      res.status(500).json({ message: 'Error validating code!' });
  }
});

