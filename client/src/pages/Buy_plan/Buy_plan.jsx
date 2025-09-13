import React, { useContext, useEffect } from "react";
import { assets, plans } from "../../assets/assets";
import { AppContext } from "../../contexts/AppContext";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const Buy_plan = () => {
  const { user, backendUrl, loadCreditsData, token, setShowLogin } = useContext(AppContext);
  const navigate = useNavigate();

  // ✅ Load Razorpay script once
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  // ✅ Initialize Razorpay payment
  const initPay = async (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Credits Payment",
      description: "Credits Payment",
      order_id: order.id,
      handler: async (response) => {
        try {
          const {data}= await axios.post(`${backendUrl}/api/user/verify-razor`, response,{ headers: { token } });
          if (data.success) {
            
            loadCreditsData();
            navigate("/");
            toast.success('credits added successfully');
          }
        } catch (error) {
          
        }
      },
      theme: { color: "#3399cc" },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  // ✅ Create order from backend
  const paymentRazorpay = async (planId) => {
    try {
      if (!user) {
        setShowLogin(true);
        return;
      }

      const res = await axios.post(
        `${backendUrl}/api/user/pay`,
        { planId },
        { headers: { token } }
      );

      if (res.data.success) {
        initPay(res.data.order);
      } else {
        toast.error("Unable to create order");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      className="min-h-[80vh] text-center pt-14 mb-10"
    >
      <button className="border border-gray-400 px-10 py-2 rounded-full mb-6">
        Our Plans
      </button>

      <h1 className="text-center text-3xl font-medium mb-6 sm:mb-10">
        Choose the plan
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-10 px-4">
        {plans.map((plan, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-2xl p-6 shadow-md hover:shadow-2xl hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer flex flex-col items-center text-center bg-white"
          >
            <img src={assets.logo_icon} alt="" className="w-12 h-12 mb-4" />
            <h2 className="text-xl font-semibold mb-1">{plan.id}</h2>
            <p className="text-gray-500 mb-4">{plan.desc}</p>

            <div className="mt-2">
              <p className="text-2xl font-bold text-blue-600">${plan.price}</p>
              <p className="text-sm text-gray-600">/ {plan.credits} Credits</p>

              <button
                onClick={() => paymentRazorpay(plan.id)}
                className="mt-4 bg-black cursor-pointer text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-blue-700 transition duration-300"
              >
                {!user ? "Get started" : "Purchase"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default Buy_plan;
