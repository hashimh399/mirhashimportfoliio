import 'dotenv/config'; // <-- This must be line 1
import express from 'express';
import cors from 'cors';
import multer from 'multer';
import { handleVoiceChat } from './controllers/voice';

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 8080;

app.use(cors());
app.use(express.json());

const upload = multer({ dest: 'uploads/' });
app.post('/api/voice', upload.single('audio'), handleVoiceChat);

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'healthy', service: 'mirhashim-api' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});