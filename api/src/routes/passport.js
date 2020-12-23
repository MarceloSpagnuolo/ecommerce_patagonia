const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const BearerStrategy = require("passport-http-bearer").Strategy;
const { User } = require("../db.js");
const jwt = require("jsonwebtoken");

passport.use(
  new LocalStrategy(
    { usernameField: "email", passwordField: "password", session: false },
    async (email, password, done) => {
      const user = await User.findOne({ where: { email: email } });
      if (!user) return done(null, false, "No se encontró el usuario");
      if (!user.compare(password))
        return done(null, false, "Contraseña incorrecta");
      const { id, name, lastname, email: userEmail, role } = user;
      return done(null, {
        id,
        name,
        lastname,
        email: userEmail,
        role,
      });
    }
  )
);

passport.use(
  new BearerStrategy((token, done) => {
    jwt.verify(token, "secreto", function (error, user) {
      if (error) return done(error);
      return done(null, user ? user : false);
    });
  })
);

module.exports = passport;
