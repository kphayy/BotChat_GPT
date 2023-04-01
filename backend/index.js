const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const routes = require('./routes');
const connectDB = require('./config/db');

dotenv.config();

const app = express();

//Connect DB
connectDB();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser());

//Routes
routes(app);

console.log(process.env.PORT)

app.listen(process.env.PORT || 8000, () => {
    console.log("Server is running...");
})