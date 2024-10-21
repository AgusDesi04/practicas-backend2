import { Schema, model } from "mongoose";

const userSchema = new Schema({
  first_name: {type: String, required : true},
  last_name: {type: String, required: true},
  email: {type: String, required: true, unique: true },
  age: {type: Number},
  avatar: {type: String},
  password: {type: String, required: true},
  // cart: {type: String, required: true},
  role: {type: String, required: true, default: 'user'},
  isGithub: {type: Boolean, default: false},
  isGoogle: {type: Boolean, default: false}



})

export const UserModel = model('users', userSchema)