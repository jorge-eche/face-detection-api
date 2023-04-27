export const handleRegister = (req, res, db, bcrypt) => {
  const { name, email, password } = req.body;

  //Form validation.
  if (!name || !email || !password) {
    return res.status(400).json("incorrect form submission");
  }

  //Hash password with bcryptjs.
  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(password, salt);
  console.log("req.body", req.body);
  //Add new user to login and user tables from our database.
  db.transaction((trx) => {
    trx
      .insert({
        hash: hash,
        email: email,
      })
      .into("login")
      .returning("email")
      .then((loginEmail) => {
        console.log("loginEmail", loginEmail);
        trx("users")
          .returning("*")
          .insert({
            name: name,
            email: loginEmail[0].email,
            joined: new Date(),
          })
          .then((user) => {
            console.log("user", user);
            console.log("user[0]", user[0]);
            res.json(user[0]);
          });
      })
      .then(() => {
        console.log("before commit", trx);
        trx.commit;
        console.log("after commit");
      })
      .catch(() => {
        console.log("before catch1");
        trx.rollback;
        console.log("after catch1");
      })
      .catch((err) => {
        console.log("before catch2");
        res.status(400).json(err);
        console.log("after catch2");
      });
  }).catch((err) => {
    console.log("before catch3");
    res.status(400).json(err);
    console.log("after catch3");
  });
};
