import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'healthy', service: 'mirhashim-api' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});