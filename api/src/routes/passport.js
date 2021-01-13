const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const BearerStrategy = require("passport-http-bearer").Strategy;
const { User } = require("../db.js");
const jwt = require("jsonwebtoken");
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
const FacebookStrategy = require( 'passport-facebook' ).Strategy;

passport.use(
  new LocalStrategy( 
    { usernameField: "email", passwordField: "password", session: false },
    async (email, password, done) => {
      const user = await User.findOne({ where: { email: email } });
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

 
passport.use(new GoogleStrategy({
  clientID: '328443840831-f6gnbi1skjvj8bih1r5bm388gu2g80st.apps.googleusercontent.com',
  clientSecret: 'seHWMC-hymiQVRNkRtlYtF42',
  callbackURL: "/auth/google/callback",
  session: false
},
async function(request, accessToken, refreshToken, profile, done) {
 const usuario = await User.findOrCreate({ 
   where: {
     googleID: profile.id
     //usar un or con email también.
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


passport.use(new FacebookStrategy({
  clientID: "331736574540258",
  clientSecret: "ffacf6d0f331622338d47715cd3eddaa",
  callbackURL: "http://localhost:3001/auth/facebook/callback",
  session: false
},
async function(accessToken, refreshToken, profile, done) {
  const nombre = profile.displayName.split(" ")
  const usuario = await User.findOrCreate({ 
    where: {
      facebookID: profile.id
      //usar un or con email también.
     },
     defaults: {
       givenname: nombre[0],
       familyname: nombre[(nombre.length-1)],
       email: profile.email,
       facebookID: profile.id,
     }
   }); done(null, usuario[0]);
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
