const mongoose = require("mongoose");
const connectDatabase = () =>{
    const URI = process.env.MONGODB_URL
    mongoose.connect(URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then((data) =>{
        console.log(`mongodb is connected with server: ${data.connection.host}`);
    })
}

module.exports = connectDatabase
