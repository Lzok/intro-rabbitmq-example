const amqp = require('amqplib');
const url = 'amqp://guest:guest@localhost:5672';

const connectionPromise = amqp.connect(url).catch((err) => {
  console.log('[AMQP]', err);
});

module.exports = connectionPromise;