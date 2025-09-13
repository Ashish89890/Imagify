import axios from 'axios';
import FormData from 'form-data';
import User from '../models/user.model.js';
export const generateImage = async (req, res) => {
    try {
        const userId = req.user.id;
        const { prompt } = req.body; // Extract prompt from request body
        const user = await User.findById(userId);
        
        
        if (!user || !prompt) {
            return res.json({
                success: false,
                message: "Misiing Details"
            });
        }
        if (user.creditBalance <= 0) {
            return res.json({
                success: false,
                credits: user.creditBalance,
                message: "Insufficient credits"
            });
        }

        const formdata = new FormData();
        formdata.append('prompt', prompt);
    
        const { data } = await axios.post('https://clipdrop-api.co/text-to-image/v1'
            , formdata, {
            headers: {
                
                'x-api-key': process.env.API_KEY,
            },
            responseType: 'arraybuffer',
        }
        )

        const imageBuffer = Buffer.from(data, 'binary');
        const imageUrl = `data:image/png;base64,${imageBuffer.toString('base64')}`;
        await User.findByIdAndUpdate(user._id,
            {
                creditBalance: user.creditBalance - 1
            }
        )
        res.json({
            success: true,
            message: "Image generated successfully",
            imageUrl,
            creditBalance: user.creditBalance - 1
        });
    
    } catch (error) {
        console.error("Image generation error:", error.message);
        res.json({
            success: false,
            message: "Something went wrong while generating the image",
            error: error.message,
        });
    }
}
