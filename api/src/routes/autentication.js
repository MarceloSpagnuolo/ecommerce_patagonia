const server = require("express").Router();
const { User } = require("../db.js")
const passport = require("passport")
const jwt = require("jsonwebtoken")

server.get("/me", async(req,res,next) => {
    try {
        if(req.user) {

            const {id} = req.user;
            const result = await User.findByPk(id);
            res.json(result);
        } else {
            res.sendStatus(401)
        }
    } catch(error) {
        next(error);
    }
});

server.post("/login", function(req, res, next) {
    passport.authenticate("local", function(error, user, info) {
        if(error) return next(error);
        else if (!user) return res.status(401).send("no se encontró usuario")
        else return res.send(jwt.sign(user, "secreto"))
    })(req, res, next)
})

server.get("/logout", function(req,res,next) {
    req.logout();
    res.redirect("/")
})

//login de google
server.get('/google',
  passport.authenticate('google', { scope:
      [ 'email', 'profile' ] }
));

//redirect de google
server.get( '/google/callback',
    passport.authenticate( 'google'), (req,res) => {
        res.send("llegaste al callback")
    }
//     {
//         successRedirect: '/auth/success',
//         failureRedirect: '/auth/failed'
// })
);


server.get('/failed', (req, res) => res.send("you failed to log in"))
server.get('/success', function(req, res) {
    res.send(`You logged in succesfully mr user`)
})
// ${req.user.email}

server.get('/github',
  passport.authenticate('github', { scope: [ 'user' ] }));

server.get('/github/callback', 
  passport.authenticate('github', { failureRedirect: '/products' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/categories');
  });


module.exports = server;