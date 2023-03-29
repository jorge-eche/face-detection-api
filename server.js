// const express = require("express");
import express from "express";

const app = express();

app.use(express.json());

const database = {
  users: [
    {
      id: "123",
      name: "Jorge",
      email: "jorge@gmail.com",
      password: "cookies",
      entries: 0,
      joined: new Date(),
    },
    {
      id: "124",
      name: "Menchie",
      email: "menchie@gmail.com",
      password: "zumba",
      entries: 0,
      joined: new Date(),
    },
  ],
};

app.get("/", (req, res) => {
  res.send("this is working");
});

app.post("/signin", (req, res) => {
  if (
    req.body.email === database.users[0].email &&
    req.body.password === database.users[0].password
  ) {
    res.json("signing in");
  } else {
    res.status(400).json("error logging in");
  }
});

app.listen(3000, () => {
  console.log("app is running on port 3000");
});

/*
/ --> res = this is working
/signin --> POST  = success/fail
/signin --> POST  = user
/profile/:userid --> GET = user
/image --> PUT --> user
*/
