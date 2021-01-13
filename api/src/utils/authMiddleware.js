
const adminAuth = (req, res, next) => {
   
    if(!req.user) {
       return res.send("No esta autorizado para realizar esta acción").status(401)
    } else if (req.user.role === "admin") {
            next()
        } else {
           return res.send("No es un usuario autorizado para realizar esta acción").status(401)
        }
}






module.exports = adminAuth;