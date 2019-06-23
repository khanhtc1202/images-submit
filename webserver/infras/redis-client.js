const redis = require('redis');
const {promisify} = require('util');
const client = redis.createClient(process.env.REDIS_DB_URL);

module.exports = {
    getAsync: promisify(client.get).bind(client),
    setAsync: promisify(client.set).bind(client),
    existAsync: promisify(client.exists).bind(client)
};
