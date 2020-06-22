const mongoose = require('mongoose');

const MONGO_URI = "mongodb+srv://cris:cris@cluster0-6psa9.gcp.mongodb.net/storybooks?retryWrites=true&w=majority"

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(MONGO_URI,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify:false
        })
        console.log(`MongoDB Connected: ${conn.connection.host}`)
    } catch (err) {
        console.error(err)
        process.exit(1)
    }
}

module.exports = connectDB