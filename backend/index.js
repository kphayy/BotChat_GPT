const express = require('express');
const app = express();

app.get("/", function(req, res){
    return res.status(200).send("hello word");
})

app.listen("/", () => {
    console.log("Server is running...");
})