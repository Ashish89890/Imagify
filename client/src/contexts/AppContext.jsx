import axios from "axios";
import React, { createContext, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
export const AppContext = createContext();

const AppcontextProvider = (props) => {
    const navigate = useNavigate();
    const [user, setUser] = React.useState(false);
    const [LoginShow, setLoginShow] = React.useState(false);
    const [token, setToken] = React.useState(localStorage.getItem('token') || null);
    const [credits, setCredits] = React.useState(false);
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const fetchUserCredits = async () => { 
        try {
            const {data} = await axios.get(backendUrl + '/api/user/credits', {
                headers:{token}
            })
            if (data.success) {
                setCredits(data.creditBalance);
                setUser(data.username);
                toast.success(`Welcome back ${data.username}! You have ${data.creditBalance} credits.`);
            } else {
                toast.error(data.message || "Failed to fetch user credits.");
            }
            
        } catch (error) {
            console.error("Error fetching user credits:", error);
            toast.error("Failed to fetch user credits. Please try again later.");
            
        }
    }
    useEffect(() => {
        if (token) {
            fetchUserCredits();
        }
    }, [token]);

    const logOut = () => {
        setUser(false);
        setToken(null);
        setCredits(false);
        localStorage.removeItem('token');
        toast.success("Logged out successfully.");
    }

    const generate_image = async (prompt) => { 
        try {
             
            const { data } = await axios.post(backendUrl + '/api/image/generate', { prompt },
                {
                headers: {token}
                }
            );
          
            if (data.success) {
                if (data.credits === 0) {
                    toast.error("You have no credits left. Please buy more credits to continue.");  
                    setTimeout(() => navigate('/buy'), 1000);
                    return; // <-- Add this line

                }
                fetchUserCredits();
                toast.success("Image generated successfully!");
                return data.imageUrl; 
                
            } else {
                if (data.credits === 0) {
                    toast.error("You have no credits left. Please buy more credits to continue.");  
                    setTimeout(() => navigate('/buy'), 1000);
                    return; // <-- Add this line

                }
                toast.error(data.message || "Failed to generate image.");
                fetchUserCredits();
               
                
            }
        } catch (error) {
            console.error("Error generating image:", error);
            toast.error("Failed to generate image. Please try again later.");
            
        }
    }
    const value = {
        user,
        setUser,
        LoginShow,
        setLoginShow,
        backendUrl,
        token,
        setToken,
        credits,
        setCredits,
        fetchUserCredits,
        logOut,
        generate_image
    };


    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};

export default AppcontextProvider;
