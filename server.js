const express = require("express");
const helmet = require("helmet"); // 🔐 Security middleware
const rateLimit = require("express-rate-limit"); // 🚀 Prevents API abuse
const cors = require("cors"); // 🌍 Cross-Origin Resource Sharing
const morgan = require("morgan"); // 📜 Logs requests
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// ✅ Apply Security Middleware
app.use(helmet()); // Protects against security threats

// ✅ Enable CORS for all requests
app.use(cors());

// ✅ Logging Middleware
app.use(morgan("dev")); // Logs requests in development mode

// ✅ Rate Limiting: Prevents too many requests from same IP
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: "Too many requests from this IP, please try again later."
});
app.use(limiter);

// ✅ Middleware to parse JSON requests
app.use(express.json());

// ✅ Connect to MongoDB
connectDB();

// ✅ Define API Routes
const authRoutes = require("./routes/authRoutes");
const schoolRoutes = require("./routes/schoolRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/schools", schoolRoutes);

// ✅ Fix: Add Missing Route for "/"
app.get("/", (req, res) => {
    res.send("API is running...");
});

// ✅ Global Error Handling Middleware
const errorHandler = require("./middleware/errorMiddleware");
app.use(errorHandler);

// ✅ Start the Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
