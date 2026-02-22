const express = require('express')
const app = express()
const port = 80

const messageQueue = [];
const maxQueueLength = 1000;

function ThrowOutOldMessages() {
    while (messageQueue.length > maxQueueLength) {
	messageQueue.shift();
    }
}

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post('/putmessage', (req, res) => {
    messageQueue.push(req.body);
    ThrowOutOldMessages();
    res.json({
	message: 'success',
    });
});

app.get('/recentmessages', (req, res) => {
    ThrowOutOldMessages();
    res.json({
	recentMessages: messageQueue,
    });
});

app.get('/meshcore/newdirectmessage', (req, res) => {
    messageQueue.push(req.query);
    ThrowOutOldMessages();
    res.json({
	message: 'success',
    });
});

app.get('/meshcore/recentdirectmessages', (req, res) => {
    ThrowOutOldMessages();
    res.json({
	recentMessages: messageQueue,
    });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
