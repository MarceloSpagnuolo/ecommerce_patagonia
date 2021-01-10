const server = require("express").Router();
const { User } = require("../db.js");
const passport = require("passport");
const jwt = require("jsonwebtoken");


//////////////////////S65/////////////////////////////
// Ruta ME trae los datos del usuario logueado. No recibe nada por body ni nada.
// Solo se le pasa el jwt que se genera al usar la ruta /login
server.get("/me", async (req, res, next) => {
  try {
    if (req.user) {
      const { id } = req.user;
      const result = await User.findByPk(id);
      return res.send(jwt.sign(result.toJSON(), "secreto"));
    } else {
      return res.sendStatus(401);
    }
  } catch (error) {
    next(error);
  }
});


///////////////////////S63///////////////////
// Ruta Login. Genera jwt Token que eventualmente se debe guardar en el local storage.
// El jwt es lo que devuelve esta ruta si se loguea el usuario con email y contraseña correctos.
server.post("/login", function (req, res, next) {
  passport.authenticate("local", function (error, user, info) {
    if (error) return next(error);
    else if (!user) return res.status(401).send("no se encontró usuario");
    else return res.send(jwt.sign(user, "secreto"));
  })(req, res, next);
});

////////////////////////S75///////////////////////
//login de google
server.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);


//redirect de google
// Se puede re-redirecionar con la parte comentada de succesRedirect o FailureRedirect.
// Por ahora sólo manda un mensaje de "llegaste al callback" para saber que se logueo correctamente.
server.get(
  "/google/callback",
  passport.authenticate("google"),
  (req, res) => {
    res.send("llegaste al callback");
  }
);

///////////////////////////////////S67////////////////////////////
// Ruta promote, para cambiar el role del usuario a admin de manera automática.
// Solo se necesita ID por params. No se necesita ninguna otra comprobación para que funcione.
server.put("/promote/:id", async (req, res, next) => {
  const { id } = req.params;
  const { role } = req.body;
  console.log(req.body)
  const promote = await User.update(
    {
      role: role,
    },
    {
      where: {
        id,
      },
      returning: true,
    }
  );

  !promote ? res.sendStatus(400) : res.json(promote[1][0]);
})

module.exports = server;
