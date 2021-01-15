const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const BearerStrategy = require("passport-http-bearer").Strategy;
const { User } = require("../db.js");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
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
      const { id, givenname, familyname, email: userEmail, city, adress, phone, postal, role } = user;
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
  clientID: process.env.GOOGLE_ID,
  clientSecret: process.env.GOOGLE_SECRET,
  callbackURL: "/auth/google/callback",
  session: false
},
async function(request, accessToken, refreshToken, profile, done) {
 const usuario = await User.findOrCreate({ 
   where: {
    [Op.or]: [{
      googleID: profile.id},
      {email: profile.emails[0].value}
    ]
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
  clientID: process.env.FACEBOOK_ID,
  clientSecret: process.env.FACEBOOK_SECRET,
  callbackURL: `/auth/facebook/callback`,
  session: false,
  profileFields: ['id', 'email', 'locale', 'name', 'verified'],
},
async function(accessToken, refreshToken, profile, done) {
  const usuario = await User.findOrCreate({ 
    where: {
      [Op.or]: [{
        facebookID: profile.id},
        {email: profile.emails[0].value}
      ]
     },
     defaults: {
       givenname: profile.name.givenName + (!!profile.name.middleName ? ` ${profile.name.middleName}` : ""),
       familyname: profile.name.familyName,
       email: profile.emails[0].value,
       facebookID: profile.id,
     }
   }); done(null, usuario[0]);
 }
 ));


passport.use(
  new BearerStrategy((token, done) => {
    jwt.verify(token, process.env.PASSPORT_SECRET, function (error, user) {
      if (error) return done(error);
      return done(null, user ? user : false);
    });
  })
);

module.exports = passport;
