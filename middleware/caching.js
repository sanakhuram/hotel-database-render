var client = require('../redis.js');

async function cache(req, res, next) {
  try {
    const data = await client.get(req.originalUrl);

    if (data !== null) {
      const username = req.user?.username ?? 0;

      res.render('hotels', {
        hotels: JSON.parse(data),
        user: req.user,
        username
      });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
}

module.exports = cache;