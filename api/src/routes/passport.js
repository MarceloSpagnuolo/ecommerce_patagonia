const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const BearerStrategy = require("passport-http-bearer").Strategy;
const { User } = require("../db.js");
const jwt = require("jsonwebtoken");
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;

passport.serializeUser(function(user, done) {
  // console.log(user, "soy el usuario serializado")
    done(null, user);
  });
  
  passport.deserializeUser( async function(user, done) {
    const usuario = await User.findByPk(user.id);
    // console.log(user, "soy el usuario deserializado")
    done(null, usuario)
  });


passport.use(
  new LocalStrategy( 
    { usernameField: "email", passwordField: "password", session: false },
    async (email, password, done) => {
      console.log("entre al local strategy");
      const user = await User.findOne({ where: { email: email } });
      console.log(user, "soy el usuario en localstrategy")
      if (!user) return done(null, false, "No se encontró el user");
      if (!user.compare(password))
        return done(null, false, "Contraseña incorrecta");
      const { id, givenname, familyname, email: userEmail, role } = user;
      return done(null, {
        id,
        givenname,
        familyname,
        email: userEmail,
        role,
      }); 
    }
  )
);

// passport.use(new GoogleStrategy({
//   clientID: '328443840831-f6gnbi1skjvj8bih1r5bm388gu2g80st.apps.googleusercontent.com',
//   clientSecret: 'seHWMC-hymiQVRNkRtlYtF42',
//   callbackURL: "/auth/google/callback",
 
passport.use(new GoogleStrategy({
  clientID: '328443840831-f6gnbi1skjvj8bih1r5bm388gu2g80st.apps.googleusercontent.com',
  clientSecret: 'seHWMC-hymiQVRNkRtlYtF42',
  callbackURL: "/auth/google/callback",
  passReqToCallback   : true
},
async function(request, accessToken, refreshToken, profile, done) {
  // User.findOrCreate({ where:{ googleID: profile.id} }), function (err, user) {
  //   return done(err, user);
  // };
 const usuario = await User.findOrCreate({ 
   where: {
     googleID: profile.id
    },
    defaults: {
      givenname: profile.given_name,
      familyname: profile.family_name,
      email: profile.email,
      googleID: profile.id,
    }
  }); done(null, usuario[0])
}
));


passport.use(
  new BearerStrategy((token, done) => {
    jwt.verify(token, "secreto", function (error, user) {
      if (error) return done(error);
      return done(null, user ? user : false);
    });
  })
);

module.exports = passport;
