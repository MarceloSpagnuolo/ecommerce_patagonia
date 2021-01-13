const db = require("../db.js");
/*inc debería venir un array. Debemos contestar con un array del modelo.
caso base: inc = ["algo", "otra cosa"] => response =  ["algo", "otra cosa"]
caso inc es objeto = [{model: "algo"}] */


function getIncludes(inc){
    console.log(inc, "SOY EL INC")
    let response = [];
    for(const value of inc){
        console.log(value, "SOY EL VALUE")
        if(typeof value === "string") {
            response.push(db[value])
            // puede ser que sea con punto (db.[inc])
            } else {
                let result = {
                    model: db[value.model]
                }
                value.include && (result.include = getIncludes(value.include))
                response.push(result);
            }
    }   
    return response;
}

//Esta función por ahora la comento pero va a ser la que eventualmente vamos a usar en todos los llamados
//get que tengan limit,where, etc. para hacerlas super dinámicas.

module.exports = getIncludes;