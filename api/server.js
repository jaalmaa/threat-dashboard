// import dependencies
const express = require('express');
const db = require('monk')(process.env.MONGO_URI);
const http = require('http');
const socketIO = require('socket.io');
const _ = require('lodash');

// initialize app
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// global variables
const port = process.env.PORT || 3001;
const hpfeed = db.get('hpfeed');
let db_content;

// function to calculate event aggregates (eg. total attacks, urls found etc.)
const get_aggregates = data => {
    let total_attacks = data.length;
    let total_urls = data.map(event => event.payload.urls).filter(urls => urls.length).length;
    let total_hashes = data.map(event => event.payload.hashes).filter(hashes => hashes.length).length;
    return {
        attacks: total_attacks,
        urls: total_urls,
        hashes: total_hashes
    };
} 

// function to read from database and emit to connected sockets
// only emit to sockets if the contents of the db has changed
const getDBAndEmit = async socket => {
    try {
        let content = await hpfeed.find({});
        if (_.xorWith(content, db_content, _.isEqual).length) {
            socket.emit("hpfeed", content.reverse().slice(0,17));
            socket.emit("aggregates", get_aggregates(content));
            db_content = content;
        };
    } catch (err) {
        console.error(`Error: ${err}`);
    }
}

// create socket.io socket with polling interval
let interval;
io.on('connection', socket => {
    console.log('New Client Connected:' + socket.id);
    hpfeed.find({})
    .then(content => {
        socket.emit("hpfeed", content.reverse().slice(0,17));
        socket.emit("aggregates", get_aggregates(content));
    });

    // set interval
    if (interval) clearInterval(interval);
    interval = setInterval(() => 
        getDBAndEmit(socket), 1000);

    // client disconnect
    socket.on("disconnect", () => {
        console.log('Client Disconnected')
    });
});

// run app
io.listen(port, () => {
    console.log(`Running API on Port ${port}`)
})