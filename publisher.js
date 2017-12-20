'use strict';

const connectionPromise = require('./amqpConnection');

const q = 'tasks';

// IIFE inmediatelly invoked function expression
(async () => {

    const conn = await connectionPromise;

    // Connect to a channel
    const ch = await conn.createChannel();
        
    // Connect to a queue
    await ch.assertQueue(q, {
        durable: true // Queue support resets 
    });

    // Send message
    setInterval(() => {
        const message = {
            task: 'do-this-task ' + Date.now()
        };
        const res = ch.sendToQueue(q, new Buffer(JSON.stringify(message)), {
            persistent: true // Message won't be deleted upon a reset
        });
        console.log(`Published: ${res} - ${message.task}`);
    },100);

})().catch(err => console.log(err));