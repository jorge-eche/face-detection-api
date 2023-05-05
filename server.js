import express from "express";
import cors from "cors";
import knex from "knex";
import bcrypt from "bcryptjs";
import logger from "./logging/logger.js";
import { handleRegister } from "./controllers/register.js";
import { handleSignIn } from "./controllers/signin.js";
import { handleImage, handleApiCall } from "./controllers/image.js";

//Add your own environmental variables.
const db = knex({
  client: "pg",
  connection: {
    host: process.env.DATABASE_HOST,
    port: 5432,
    user: "postgres",
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DB,
  },
});

logger.info(process.env.DATABASE_HOST);
logger.info(process.env.DATABASE_PASSWORD);
logger.info(process.env.DATABASE_DB);

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("success");
});

app.post("/signin", (req, res) => {
  handleSignIn(req, res, db, bcrypt);
});

app.post("/register", (req, res) => {
  handleRegister(req, res, db, bcrypt);
});

app.get("/profile/:id", (req, res) => {
  handleProfileGet(req, res, db);
});

// Fetches Clarifai API
app.post("/imageurl", (req, res) => {
  handleApiCall(req, res);
});

//updates the entries and increases the count
app.put("/image", (req, res) => {
  handleImage(req, res, db);
});

app.listen(process.env.PORT, () => {
  console.log(`app is running on port ${process.env.PORT}`);
});
