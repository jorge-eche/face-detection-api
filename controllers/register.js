export const handleRegister = (req, res, db, bcrypt) => {
  const { name, email, password } = req.body;

  //Hash password with bcryptjs.
  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(password, salt);

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
        console.log(loginEmail);
        trx("users")
          .returning("*")
          .insert({
            name: name,
            email: loginEmail[0].email,
            joined: new Date(),
          })
          .then((user) => {
            res.json(user[0]);
          });
      })
      .then(trx.commit)
      .catch(trx.rollback);
  }).catch((err) => res.status(400).json("unable to register"));
};
