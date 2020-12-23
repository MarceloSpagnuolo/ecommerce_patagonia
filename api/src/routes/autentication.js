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


module.exports = server;