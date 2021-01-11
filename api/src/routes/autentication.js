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
      res.json(result);
    } else {
      res.sendStatus(401);
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


/////////////////////////////S64//////////////////
// Ruta Logout. req.logout() borra las cookies relacionadas al login. No toca localstorage ni nada del jwt.
server.get("/logout", function (req, res, next) {
  req.logout();
  res.redirect("/");
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
  //     {
  //         successRedirect: '/auth/success',
  //         failureRedirect: '/auth/failed'
  // })
);

// Rutas para usar en el re-redirecionamiento de la estrategia de google
server.get("/failed", (req, res) => res.send("you failed to log in"));
server.get("/success", function (req, res) {
  res.send(`You logged in succesfully mr user`);
});



// Estrategia de Github
server.get("/github", passport.authenticate("github", { scope: ["user"] }));


// Callback de github
server.get(
  "/github/callback",
  passport.authenticate("github", { failureRedirect: "/products" }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("/categories");
  }
);
////////////////////////////////////////////////////////////////


///////////////////////////////////S67////////////////////////////
// Ruta promote, para cambiar el role del usuario a admin de manera automática.
// Solo se necesita ID por params. No se necesita ninguna otra comprobación para que funcione.
server.put("/promote/:id", async (req, res, next) => {
  const { id } = req.params;
  const { role } = req.body;
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
