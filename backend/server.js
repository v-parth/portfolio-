// Load Environment Variables
require("dotenv").config();


// Import Packages
const express = require("express");
const cors = require("cors");


// Import Database Connection
const connectDB = require("./config/db");


// Import Routes
const contactRoutes = require("./routes/contactRoutes");


// Create Express App
const app = express();


// Connect MongoDB
connectDB();


// ======================
// Middlewares
// ======================


// Enable CORS
    app.use(cors({
    origin: "https://jaiminkumar-portfolio.vercel.app",
    methods: ["GET", "POST"],
    credentials: true
}));



// Parse JSON Data
app.use(express.json());


// Parse Form Data
app.use(express.urlencoded({ extended: true }));



// ======================
// Routes
// ======================


// Home Route
app.get("/", (req, res) => {

    res.status(200).json({

        success: true,

        message: "Welcome to Portfolio Contact Form API"

    });

});



// Contact API
app.use("/api/contact", contactRoutes);



// ======================
// 404 Route
// ======================


app.use((req, res) => {

    res.status(404).json({

        success: false,

        message: "Route Not Found"

    });

});



// ======================
// Error Handler
// ======================

app.use((err, req, res, next) => {

    console.error(err);

    res.status(500).json({

        success:false,

        message:"Internal Server Error"

    });

});



// ======================
// Start Server
// ======================


const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {

    console.log("===================================");

    console.log(`🚀 Server Running Successfully`);

    console.log(`🌐 URL : http://localhost:${PORT}`);

    console.log("===================================");

});