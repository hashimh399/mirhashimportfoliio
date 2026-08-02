import 'dotenv/config'; // <-- This must be line 1
import express from 'express';
import cors from 'cors';
import cron from 'node-cron';
import multer from 'multer';
import axios from 'axios';
import { handleVoiceChat } from './controllers/voice';
import {redis} from './lib/redis';

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 8080;

app.use(cors());
app.use(express.json());

const upload = multer({ dest: 'uploads/' });
app.post('/api/voice', upload.single('audio'), handleVoiceChat);
const fetchMarketData = async () => {
  try {
    console.log('🔄 Fetching live market data...');

    // Fetch Crypto Prices (CoinGecko)
    const cryptoRes = await axios.get(
      'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=usd',
      {
        headers: process.env.COIN_GECKO_KEY
          ? { 'x-cg-demo-api-key': process.env.COIN_GECKO_KEY }
          : {},
      }
    );

    const marketData = {
      crypto: {
        BTC: cryptoRes.data.bitcoin?.usd ?? 0,
        ETH: cryptoRes.data.ethereum?.usd ?? 0,
        SOL: cryptoRes.data.solana?.usd ?? 0,
      },
      lastUpdated: new Date().toISOString(),
    };

    // Cache in Upstash Redis for 70 seconds (slightly above 60s cron schedule)
    await redis.set('market_ticker', JSON.stringify(marketData), { ex: 70 });
    console.log('✅ Market data updated in Redis cache');
  } catch (error) {
    console.error('❌ Error updating ticker cache:', error);
  }
};

// Cron Job: Run every 60 seconds
cron.schedule('* * * * *', () => {
  fetchMarketData();
});

// GET /api/ticker - Fast sub-millisecond read from Redis
app.get('/api/ticker', async (req, res) => {
  try {
    const cachedData = await redis.get<string>('market_ticker');

    if (cachedData) {
      const parsed = typeof cachedData === 'string' ? JSON.parse(cachedData) : cachedData;
      return res.json({ success: true, data: parsed });
    }

    // Fallback if key doesn't exist yet
    await fetchMarketData();
    const freshData = await redis.get('market_ticker');
    return res.json({ success: true, data: freshData });
  } catch (error) {
    console.error('Redis fetch error:', error);
    return res.status(500).json({ success: false, error: 'Failed to retrieve ticker data' });
  }
});
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'healthy', service: 'mirhashim-api' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
   fetchMarketData();
});