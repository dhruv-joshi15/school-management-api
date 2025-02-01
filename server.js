const express = require("express");
const helmet = require("helmet"); 
const rateLimit = require("express-rate-limit"); 
const cors = require("cors"); 
const morgan = require("morgan"); 
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// Loading environment variables
dotenv.config();

// Initializing Express app
const app = express();

// Applying Security Middleware
app.use(helmet()); 

// Enabling CORS for all requests
app.use(cors());

// Logging Middleware
app.use(morgan("dev")); 

const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, 
    max: 100, 
    message: "Too many requests from this IP, please try again later."
});
app.use(limiter);

app.use(express.json());

connectDB();


const authRoutes = require("./routes/authRoutes");
const schoolRoutes = require("./routes/schoolRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/schools", schoolRoutes);


app.get("/", (req, res) => {
    res.send("API is running...");
});

const errorHandler = require("./middleware/errorMiddleware");
app.use(errorHandler);


const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
