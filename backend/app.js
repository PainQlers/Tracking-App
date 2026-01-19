import express from "express";
import cors from "cors";
import router from "./routes/index.js";

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
  }));

// middleware
app.use(express.json());

// routes
app.use("/api", router);

export default app;
