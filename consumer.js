'use strict';

const connectionPromise = require('./amqpConnection');

const q = 'tasks';

// IIFE inmediatelly invoked function expression
(async () => {

    const conn = await connectionPromise;

    // Connect to a channel
    const ch = await conn.createChannel();

    // Connect to a queue
    await ch.assertQueue(q);

    // Set the number of parallel messages we can receive from Rabbit
    ch.prefetch(1); 

    await ch.consume(q, function(msg) {
        
        console.log('Received:', msg.content.toString());
        // Processing the message
        setTimeout(function() { 
            // In a real scenario, instead of the timeout
            // we will do a work like send emails, create db entries, etc.
            
            // After finish the work, we need to tell to Rabbit the message is done
            ch.ack(msg);
            // Also we can tell Rabbit the message can't be processed -> ch.nack(msg) 
        }, 500);
    });

})().catch(err => console.error(err));