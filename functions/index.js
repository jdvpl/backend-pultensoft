const functions = require("firebase-functions");
const express=require("express");

const app=express();



app.get("/hola", (req, res)=>{
  return res.status(200).json({message: "Api rest con node y firebase"});
});

app.use(require('./routes/users'))


exports.app=functions.https.onRequest(app);

