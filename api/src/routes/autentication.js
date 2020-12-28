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
    console.log("Entre al login")
    passport.authenticate("local", function(error, user, info) {
        console.log(user, "soy el usuario dentro de login")
        if(error) return next(error);
        else if (!user) return res.status(401).send("no se encontró usuario")
        else return res.send(jwt.sign(user, "secreto"))
    })(req, res, next)
})

//login de google
server.get('/google',
  passport.authenticate('google', { scope:
      [ 'email', 'profile' ] }
));

//redirect de google
server.get( '/google/callback',
    passport.authenticate( 'google'), (req,res) => {
        console.log(req.user, "soy el user del callback")
        res.send("llegaste al callback")
    }
//     {
//         successRedirect: '/auth/success',
//         failureRedirect: '/auth/failed'
// })
);


server.get('/failed', (req, res) => res.send("you failed to log in"))
server.get('/success', function(req, res) {
    console.log(req.user, "soy el success")
    res.send(`You logged in succesfully mr user`)
})
// ${req.user.email}




module.exports = server;