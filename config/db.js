const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        console.log(`🔍 MongoDB URI: ${process.env.MONGO_URI || "Not Defined"}`); // Debugging
        if (!process.env.MONGO_URI) {
            throw new Error("MONGO_URI is not defined");
        }

        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    } catch (err) {
        console.error(`❌ MongoDB Connection Error: ${err.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;
