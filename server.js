import express from "express";
import cors from "cors";
import knex from "knex";
import bcrypt from "bcryptjs";
import { handleRegister } from "./controllers/register.js";
import { handleSignIn } from "./controllers/signin.js";
import { handleImage, handleApiCall } from "./controllers/image.js";

//Add your own environmental variables.
const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    port: 5432,
    user: "postgres",
    password: "test1",
    database: "smart-brain",
  },
});

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

app.listen(3000, () => {
  console.log("app is running on port 3000");
});
