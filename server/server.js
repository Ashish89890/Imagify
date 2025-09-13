import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import UserRouter from './Routes/user.rout.js';
import ImageRouter from './Routes/image.rout.js';

const PORT = process.env.PORT || 5000;
const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/user', UserRouter);
app.use('/api/image', ImageRouter);
app.get('/', (req, res) => {
  res.send('API is running');
});

(async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`✅ Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error('❌ Failed to connect to MongoDB', err);
  }
})();
