import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import express from "express";
import jwt from "jsonwebtoken";
import razorpay from 'razorpay';
import TransactionModel from "../models/transaction.model.js";
const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.json({
                success: false,
                message: "All fields are required"
            });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const userData = {
            username,
            password: hashedPassword,
            email
        };
        const newUser = new User(userData);
        const user = await newUser.save();
        
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "30d"
        });
        res.json({
    success: true,
    message: "User registered successfully",
    token,
    user: {
        username: user.username,
        email: user.email
    }
});

        
    } catch (error) {
    if (error.code === 11000) {
        // Duplicate key error
        const field = Object.keys(error.keyPattern)[0];
        return res.json({
            success: false,
            message: `The ${field} is already taken.`
        });
    }
    console.error("Error registering user:", error);
    res.json({
        success: false,
        message: error.message || "Internal server error"
    });
}
}




const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.json({
                success: false,
                message: "Email and password are required"
            });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({
                success: false,
                message: "User does not exist"
            });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.json({
                success: false,
                message: "Invalid password"
            });
        }
        else {
             const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "30d"
        });
        res.json({
    success: true,
    message: "Login successful",
    token,
    user: {
        username: user.username,
        email: user.email
    }
});

        }
       
    } catch (error) {
        console.error("Error logging in user:", error);
        res.status(500).json({
            success: false,
            message: error.message || "Internal server error"
        });
    }
}


const userCredits = async (req, res) => {
    try {
        const userId = req.user.id; 
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        res.json({
            success: true,
            creditBalance: user.creditBalance,
            username: user.username,
            email: user.email
        });
        
    } catch (error) {
        console.error("Error fetching user credits:", error);
        res.status(500).json({
            success: false,
            message: error.message || "Internal server error"
        }); 
    }
};
const razorpayInstance = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});
const paymentRazorpay = async (req, res) => {
  try {
    const userId = req.user?.id || req.body.userId;
    const { planId } = req.body;

    if (!userId || !planId) {
      return res.json({ success: false, message: "Missing details" });
    }

    let credits, plan, amount;
    switch (planId) {
      case "Basic":
        plan = "Basic";
        credits = 20;
        amount = 10;
        break;
      case "Advanced":
        plan = "Advanced";
        credits = 100;
        amount = 40;
        break;
      case "Business":
        plan = "Business";
        credits = 200;
        amount = 75;
        break;
      default:
        return res.json({ success: false, message: "Plan not found" });
    }

    // Step 1: Save a transaction first
    const newTransaction = await TransactionModel.create({
      userId,
      plan,
      credits,
      amount,
      status: "created",
      date: Date.now(),
    });

    // Step 2: Create Razorpay order using that transaction _id as receipt
    const options = {
      amount: amount * 100, // amount in paisa
      currency: process.env.CURRENCY || "INR",
      receipt: newTransaction._id.toString(),
    };
    const order = await razorpayInstance.orders.create(options);

    // Step 3: Update the transaction with orderId
    newTransaction.orderId = order.id;
    await newTransaction.save();

    // Step 4: Send order back to frontend
    res.json({ success: true, order });

  } catch (error) {
    console.error("Razorpay order error:", error);
    res.json({ success: false, message: "Unable to create order", error: error.message });
  }
};

const verifyrazorpay = async (req, res) => {
    try {
        const { razorpay_order_id} = req.body;
        const orderinfo = await razorpayInstance.orders.fetch(razorpay_order_id);
        if (orderinfo.status === 'paid') {
            const transactiondata = await TransactionModel.findById(orderinfo.receipt);
            if (transactiondata.payment) {
                return res.json({ success: false, message: "Payment already verified" });
            }
            const userdata = await User.findById(transactiondata.userId);
            const creditbalance = userdata.creditBalance + transactiondata.credits;
            await User.findByIdAndUpdate(transactiondata.userId, { creditBalance: creditbalance });
            await TransactionModel.findByIdAndUpdate(transactiondata._id, { payment: true, status: 'paid' });
            res.json({ success: true, message: "Payment verified successfully", creditBalance: creditbalance });
        }   
        
    } catch (error) {
       console.log(error);
    }
}
export { registerUser, loginUser , userCredits,paymentRazorpay ,verifyrazorpay};