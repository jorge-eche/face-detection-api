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

app.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  database.users.push({
    id: "125",
    name: name,
    email: email,
    password: password,
    entries: 0,
    joined: new Date(),
  });

  res.json(database.users[database.users.length - 1]);
});

app.get("/profile/:id", (req, res) => {
  const { id } = req.params;
  let found = false;
  database.users.forEach((user) => {
    if (user.id === id) {
      found = true;
      return res.json(user);
    }
  });
  if (!found) {
    res.status(404).json("not found");
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