const mongoose = require('mongoose');

mongoose.set("strictQuery", false);

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGODB_URI, () => {
            console.log("Connect MongoDB Success");
        });
    }
    catch(err){
        console.log(`Error connecting MongoDB ${err.message}`);
        process.exit();
    }
}

module.exports = connectDB;