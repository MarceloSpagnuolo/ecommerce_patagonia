var fs = require("fs")
const mailgunLoader = require("mailgun-js")
const mailgun = mailgunLoader({
    apiKey: "4f95edc4f3482ddd9e81b49785cd9e39-28d78af2-10910db6",
    domain: "sandboxb74872ac5dad4a46ab7984b0df64bba0.mailgun.org"
});
const jwt = require('jsonwebtoken');

function passwordReset(obj) {

  const token = jwt.sign({ userId: obj.id, action: 'password_reset' }, "secreto");

  var modelEmail = fs.readFileSync("./src/mailmodel/passwordReset.html", 'utf8', function (err, data) {
    if (err) console.error(err);
    return data
  })

  var datatemplate = `<a style="padding:0.5em; display:inline-block; text-decoration:none; background-color: red; color:#ffffff; margin:.5em; border-radius:.5em;"href="${process.env.CALLBACK_URL_BASE || 'http://localhost:3000'}/reset?token=${token}">RESETEAR CONTRASEÑA</a>`
  var copypaste = `http://localhost:3001/reset?token=${token}` 
  modelEmail = modelEmail.replace("%username%", obj.name.toUpperCase());
  modelEmail = modelEmail.replace("%resetlink%", datatemplate);
  modelEmail = modelEmail.replace("%direccion%", copypaste);

  mailgun.messages().send({
    from: 'Ecommerce Patagonia <support@patagonia.com>',
    to: obj.to,
    subject: 'Cambio de contraseña',
    html: modelEmail
  }, function (err, info) {
    if (err) {
      console.error('Error: ' + err);
    } else {
      console.error('Response: ' + info);
    }
  });

  return modelEmail;
}
module.exports = {
  passwordReset
}
