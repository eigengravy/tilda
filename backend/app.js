import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
// import cors from "cors";
import ws, { WebSocketServer } from "ws";

import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import gistRoutes from "./routes/gists.js";

const wss = new WebSocketServer({ noServer: true });

wss.on("connection", (socket) => {
  socket.on("message", (message) => {
    for (const client of wss.clients) {
      if (client.readyState === ws.OPEN) {
        client.send(message.toString());
      }
    }
  });
});

const app = express();
dotenv.config();

const connect = () => {
  mongoose.connect(process.env.MONGO_URL).catch((err) => {
    throw err;
  });
};

app.use(express.json());
app.use(cookieParser());

// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     credentials: true,
//   })
// );

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/gists", gistRoutes);

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong";
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

const server = app.listen(process.env.PORT, () => {
  connect();
});

server.on("upgrade", (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (socket) => {
    wss.emit("connection", socket, request);
  });
});
