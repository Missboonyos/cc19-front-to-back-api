const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const handleErrors = require('./middlewares/error');
// Routing
const authRouter = require("./routes/auth-route");
const userRouter = require("./routes/user-route");

const app = express();

// Middlewares
app.use(cors()); // Allow Cross-Origin Resource Sharing
app.use(morgan("dev")); // show log terminal: Log HTTP requests
app.use(express.json()); // Parse JSON bodies = read req.body

// Routing
app.use("/api", authRouter);
app.use("/api", userRouter);

//Handle errors
app.use(handleErrors);

// Start server
const PORT = 8899
app.listen(PORT, ()=> console.log(`Server is running on port ${PORT}`));