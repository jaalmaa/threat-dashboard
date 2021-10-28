const express = require('express');
const db = require('monk')(process.env.MONGO_URI);
const http = require('http');
const socketIO = require('socket.io');
const _ = require('lodash');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const port = process.env.PORT || 3001;
const hpfeed = db.get('hpfeed');
const maxInteractionCount = 20;
let currentInteractionData;

// function to calculate event aggregates (eg. total attacks, urls found etc.)
const getAggregates = data => {
    let total_attacks = data.length;
    let total_urls = data.map(event => event.payload.urls).filter(urls => urls.length).length;
    let total_hashes = data.map(event => event.payload.hashes).filter(hashes => hashes.length).length;
    return {
        attacks: total_attacks,
        urls: total_urls,
        hashes: total_hashes
    };
}

const getAllInteractions = async () => {
    return await hpfeed.find({}, (err) => {
        if (err) return "Error accessing database";
    });
}

const getAllInteractionsFromLast24Hours = async() => {
    const earliestTimestamp = new Date().getTime() - (24 * 60 * 60 * 1000);
    return await hpfeed.find({ timestamp: { $gt: new Date(earliestTimestamp) }}, (err) => {
        if (err) return "Error accessing database";
    });
}

const getLastNInteractions = async interactionsCount => {
    return await hpfeed.find({}, { sort: { _id: -1  }, limit: interactionsCount }, (err) => {
        if (err) return "Error accessing database";
    });
}

// function to read from database and emit to connected sockets
// only emit to sockets if the contents of the db has changed
const getDBAndEmit = async socket => {
    try {
        let lastNInteractionData = await getLastNInteractions(maxInteractionCount);
        let allInteractionData = await getAllInteractionsFromLast24Hours();
        if (_.xorWith(lastNInteractionData, currentInteractionData, _.isEqual).length) {
            socket.emit("hpfeed", lastNInteractionData);
            socket.emit("aggregates", getAggregates(allInteractionData));
            currentInteractionData = lastNInteractionData;
        };
    } catch (err) {
        console.error(`Error: ${err}`);
    }
}

// create socket.io socket with polling interval
let interval;
io.on('connection', socket => {
    console.log('New Client Connected:' + socket.id);

    getLastNInteractions(maxInteractionCount).then(interactionData => {
        socket.emit("hpfeed", interactionData);
    });
    getAllInteractionsFromLast24Hours().then(allInteractionData => {
        socket.emit("aggregates", getAggregates(allInteractionData));
    });

    // set interval
    if (interval) clearInterval(interval);
    interval = setInterval(() => 
        getDBAndEmit(socket), 1000
    );

    // client disconnect
    socket.on("disconnect", () => {
        console.log('Client Disconnected')
    });
});

// run app
io.listen(port, () => {
    console.log(`Running API on Port ${port}`)
})