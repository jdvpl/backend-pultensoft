const functions = require("firebase-functions");
const express=require("express");
const cors = require('cors');
const app=express();


// Automatically allow cross-origin requests
app.use(cors({ origin: true }));
app.use(require('./routes/users'))


exports.app=functions.https.onRequest(app);

