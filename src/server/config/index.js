if (process.env.BROWSER) {
  throw new Error(
    'Do not import `config.js` from inside the client-side code.',
  );
}

module.exports = {
  appName: 'Twitter Top Links',
  // Node.js app
  port: process.env.PORT || 3000,

  // https://expressjs.com/en/guide/behind-proxies.html
  trustProxy: process.env.TRUST_PROXY || 'loopback',

  // Database
  databaseUrl:
    process.env.DATABASE_URL ||
    'mongodb+srv://cascan:BodZvH7810BtP5Ex@mayall-ii.pulfo.mongodb.net/twitter_top_links?retryWrites=true&w=majority',

  // Authentication
  auth: {
    jwt: { secret: process.env.JWT_SECRET || 'TTL top secret' },
    // https://apps.twitter.com/
    twitter: {
      key: process.env.TWITTER_CONSUMER_KEY || 'asEan9EE05kDPwkNrbRS0Gir3',
      secret:
        process.env.TWITTER_CONSUMER_SECRET ||
        'y9y3vZgNBuSdAS9hMjTJDErSKFOwgulyfM2LcwIuhBOJqr616x',
      callbackURL:
        process.env.TWITTER_CALLBACK_URL ||
        'http://localhost:3000/auth/twitter/callback',
    },
  },
};
