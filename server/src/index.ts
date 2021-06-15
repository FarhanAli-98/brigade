import dotenv from 'dotenv';
dotenv.config();
const appid = process.env.PORT;
import express, { Application } from "express";
import { MONGO_URI, MONGO_OPTIONS } from "./config";
import router from "./routes";
import mongoose from "mongoose";

import path from "path";

const app = express();

const port = appid||5000;

app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));
app.use("/api", router);
mongoose
  .connect(MONGO_URI, MONGO_OPTIONS)
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on port ${port}\n`);
    });
  })
  .catch((err) => {});

// spdy.createServer(options, app)
