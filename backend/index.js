const express = require('express');
const app = express();

app.get("/", function(req, res){
    return res.status(200).send("hello world 2222222s");
})

app.listen(8000, () => {
    console.log("Server is running...");
})