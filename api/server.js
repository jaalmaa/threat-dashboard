const express = require('express');
const db = require('monk')(process.env.MONGO_URI);
const http = require('http');
const socketIO = require('socket.io');
const axios = require('axios');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const port = process.env.PORT || 3001;
const hpfeed = db.get('sessiondata');
const interactionEngineURI = process.env.INTERACTION_URI;
const maxInteractionCount = 20;
let currentInteractionData = [];

const getAggregates = data => {
    console.log(data);
    let total_attacks = data.length;
    console.log(total_attacks);
    let total_urls = data.map(event => event.url).filter(urls => urls.length).length;
    console.log(total_urls);
    let total_hashes = data.map(event => event.shasum).filter(hashes => hashes.length).length;
    console.log(total_hashes);
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
    return await hpfeed.find({ startTime: { $gt: new Date(earliestTimestamp).toISOString() }}, err => {
        if (err) return "Error accessing database";
    });
}

const getLastNInteractions = async interactionsCount => {
    return await hpfeed.find({}, { sort: { _id: -1  }, limit: interactionsCount }, err => {
        if (err) return "Error accessing database";
    });
}

const getDBAndEmit = async sockets => {
    let lastNInteractionData = await getLastNInteractions(maxInteractionCount);
    let allInteractionData = await getAllInteractionsFromLast24Hours();
    if (!( JSON.stringify(lastNInteractionData) === JSON.stringify(currentInteractionData) )) {
        currentInteractionData = lastNInteractionData;
        // const interactionDataWithDetections = await generateInteractionDataWithDetections(lastNInteractionData);
        sockets.emit("aggregates", getAggregates(allInteractionData));
        sockets.emit("hpfeed", currentInteractionData);
    };
}

// use this function to enrich interaction data with detections. BROKEN ATM, NEEDS FIX.
// const generateInteractionDataWithDetections = async interactionData => {
//     const interactionDataToSend = [];
//     await Promise.all(interactionData.map(async item => {
//         let itemCopy = Object.assign({}, item);
//         const detections = await getInteractionAnalysis(itemCopy);
//         itemCopy.detections = detections;
//         interactionDataToSend.push(itemCopy);
//     }));
//     if (interactionDataToSend.length === maxInteractionCount) {
//         return interactionDataToSend;
//     }
// }

const checkInteractionEngineIsOnline = async () => {
    axios.get(`${interactionEngineURI}/`)
    .then(res => {
        if (res.data.message === 'success') return true;
        else return false;
    })
    .catch(err => {
        console.error(err);
    })
}

const getInteractionAnalysis = async interactionData => {
    interactionData._id = interactionData._id.toString();
    interactionData.startTime = interactionData.startTime.toString();
    let res = await axios.post(`${interactionEngineURI}/analyze`, {
        honeypot_data: interactionData
    })
    return res.data.detections;
}

let interval;
io.on('connection', socket => {
    console.log('New Client Connected:' + socket.id);

    getLastNInteractions(maxInteractionCount).then(interactionData => {
        socket.emit("hpfeed", interactionData);
    });
    
    getAllInteractionsFromLast24Hours().then(allInteractionData => {
        socket.emit("aggregates", getAggregates(allInteractionData));
    });

    if (interval) clearInterval(interval);
    interval = setInterval(() =>
        getDBAndEmit(io.sockets), 1000
    );

    socket.on("disconnect", () => {
        console.log('Client Disconnected')
    });
});

io.listen(port, () => {
    console.log(`Running API on Port ${port}`)
})
