const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const healthRoutes = require("./routes/health.routes")
const authRoutes = require("./routes/auth.routes");

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/api/health", healthRoutes);
app.use("/api/auth", authRoutes);

module.exports = app;