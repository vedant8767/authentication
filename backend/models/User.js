// const mongoose = require('mongoose');
import mongoose from "mongoose";
// User Schema
const userSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  password: String,
  win: { type: Boolean, default: false }, // Track if the user has won
  attempts: { type: Number, default: 0 },  
});

// const User = mongoose.model('User', userSchema);

// Winning Code Schema
const winningCodeSchema = new mongoose.Schema({
  code: String,
  used: { type: Boolean, default: false }, // Track if the code is used
});

// const WinningCode = mongoose.model('WinningCode', winningCodeSchema);

export const User = mongoose.model('User', userSchema);
export const WinningCode = mongoose.model('WinningCode', winningCodeSchema);

