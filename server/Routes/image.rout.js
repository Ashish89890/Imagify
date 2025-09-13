import express from 'express';
import { generateImage } from '../controller/image.control.js';
import UserAuth from '../middlewears/auth.js';
const ImageRouter = express.Router();
ImageRouter.post('/generate', UserAuth, generateImage);
export default ImageRouter;