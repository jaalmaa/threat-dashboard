// import dependencies
const express = require('express');
const db = require('monk')(process.env.MONGO_URI);
const http = require('http');
const socketIO = require('socket.io');

// initialize app
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// global variables
const port = process.env.PORT || 3000;
const hpfeed = db.get('hpfeed');

// function to read from database and emit to connected sockets
const getDBAndEmit = async socket => {
    try {
       let documents = hpfeed.find({})
       .then(docs => socket.emit("hpfeed", docs));
    } catch (err) {
        console.error(`Error: ${err}`);
    }
}

// create socket.io socket with polling interval
let interval;
io.on('connection', socket => {
    console.log('New Client Connected:' + socket.id);

    // set interval
    if (interval) clearInterval(interval);
    interval = setInterval(() => 
        getDBAndEmit(socket), 1000);

    // return initial data
    socket.on('initial_data', () => {
        hpfeed.find({})
        .then(documents => {
            io.sockets.emit("get_data", documents);
        });
    });

    // client disconnect
    socket.on("disconnect", () => {
        console.log('Client Disconnected')
    });
});

// run app
io.listen(port, () => {
    console.log(`Running API on Port ${port}`)
})
