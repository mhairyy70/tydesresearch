import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.STORAGE_KV_REST_API_URL,
  token: process.env.STORAGE_KV_REST_API_TOKEN,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const { stock } = req.body;
  await redis.set('tydes-stock', stock);
  res.status(200).json({ ok: true });
}
