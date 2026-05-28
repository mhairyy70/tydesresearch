import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
});

const DEFAULT_STOCK = [
  { id: 1, name: "GHK-CU", spec: "50mg", unit: "vial", qty: 5, price: 390 },
  { id: 2, name: "RETA", spec: "10mg", unit: "vial", qty: 6, price: 660 },
  { id: 3, name: "BAC Water", spec: "3ml", unit: "vial", qty: 6, price: 60 },
  { id: 4, name: "Big Vial Holder", spec: "", unit: "piece", qty: 3, price: 220 },
  { id: 5, name: "Small Vial Holder", spec: "", unit: "piece", qty: 6, price: 70 },
];

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end();
  const stock = await redis.get('tydes-stock');
  res.status(200).json(stock || DEFAULT_STOCK);
}
