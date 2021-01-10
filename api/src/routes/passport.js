const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const BearerStrategy = require("passport-http-bearer").Strategy;
const { User } = require("../db.js");
const jwt = require("jsonwebtoken");
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
const GitHubStrategy = require( 'passport-github2' ).Strategy;

passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser( async function(id, done) {
    const usuario = await User.findByPk(id);
    done(null, usuario)
  });


passport.use(
  new LocalStrategy( 
    { usernameField: "email", passwordField: "password", session: false },
    async (email, password, done) => {
      const user = await User.findOne({ where: { email: email } });
      if (!user) return done(null, false, "No se encontró el user");
      if (!user.compare(password))
        return done(null, false, "Contraseña incorrecta");
      const { id, givenname, familyname, email: userEmail, role, city, adress, phone, postal } = user;
      return done(null, {
        id,
        givenname,
        familyname,
        email: userEmail,
        city,
        adress,
        phone,
        postal,
        role,
      }); 
    }
  )
);

 
passport.use(new GoogleStrategy({
  clientID: '328443840831-f6gnbi1skjvj8bih1r5bm388gu2g80st.apps.googleusercontent.com',
  clientSecret: 'seHWMC-hymiQVRNkRtlYtF42',
  callbackURL: "/auth/google/callback",
  passReqToCallback   : true
},
async function(request, accessToken, refreshToken, profile, done) {
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


passport.use(new GitHubStrategy({
  clientID: "0d14b759471f535ef16a",
  clientSecret: "ebd4d25aefe97acc2b6c9fc09293534f7268dfc4",
  callbackURL: "/auth/github/callback"
},
async function(accessToken, refreshToken, profile, done) {
  const usuario = await User.findOrCreate({ 
    where: {
      githubID: profile.id
     },
     defaults: {
      givenname: "profile.given_name",
      familyname: "profile.family_name",
       email: profile.emails[0].value,
       githubID: profile.id,
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
