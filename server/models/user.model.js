import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
   
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    },
  creditBalance: {
    type: Number,
    default: 5,
  }
  
},{
  timestamps: true,
});
const User = mongoose.models.User || mongoose.model("User", userSchema);
// Export the User model
export default User;
