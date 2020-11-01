import express from "express";
import http from "http";
import cors from "cors";
import mongoose from "mongoose";

import clearFields from "./routes/clear-fields";
import getComments from "./routes/get-comments";
import UploadFile from "./routes/upload-file";
import createUser from "./routes/create-user";
import getUsers from "./routes/get-users";
import getFiles from "./routes/get-files";
import getFileComments from "./routes/get-file-comments";

const PORT = 5000;

const app = express();
const router = express.Router();
app.use(express.static(__dirname + "/public"));
app.use(cors());
app.use(router);
router.use(express.json());
const mongoDB = "mongodb://127.0.0.1/igdata";

router.use(function timeLog(req, res, next) {
  console.log(`${req.method} Time: `, Date.now());
  next();
});

// ROUTES
router.get("/clear-fields", clearFields);
router.get("/get-comments", getComments);
router.get("/get-users", getUsers);
router.get("/get-files", getFiles);
router.get("/get-file-comments", getFileComments);

router.post("/upload-file", UploadFile);
router.post("/create-user", createUser);

const server = http.createServer(app);
server.listen(PORT, async () => {
  await mongoose
    .connect(mongoDB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      autoIndex: true,
    })
    .then(console.log("Connected to DB"))
    .catch((err) => console.error(err));
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "MongoDB connection error"));

  console.log(`Listening at PORT: ${PORT}`);
});