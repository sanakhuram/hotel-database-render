const { createClient } = require('redis');

const redisClient = createClient({
  url: process.env.REDIS_URL
});

redisClient.on('error', (err) => {
  console.error('Redis Client Error:', err.message);
});

redisClient.connect().catch(console.error);

module.exports = redisClient;