var fs = require("fs")
const mailgunLoader = require("mailgun-js")
const mailgun = mailgunLoader({
  apiKey: process.env.MAILGUN_KEY,
  domain: process.env.MAILGUN_SECRET,
});



function dispatch(obj) {

  var modelEmail = fs.readFileSync("./src/mailmodel/dispatch.html", 'utf8', function (err, data) {
    if (err) console.error(err);
    return data
  })

  var dataTemplate = obj.products.reduce(function (acc, current) {
    return `${acc}<a class="imagen" href="${process.env.CALLBACK_URL_BASE || 'http://localhost:3000'}/product/${current.id}" style="display:block;margin: .5em 1em; grid-auto-columns: 100%;text-decoration: none; color:#000000;font-weight: 600;">
        <p style="margin-bottom: .5em; text-transform: capitalize;">${current.name}</p>
        <img  style="height: 8em; width: 8em; border-radius: 10%; border: goldenrod solid .2em;" src='${current.thumbnail}'/>
        <p style="display: block;margin: .25em;">Cantidad: ${current.Order_products.quantity}</p>
        <p style="display: block;margin: .5em;">${current.description}</p>
        </a>`
  }, "<div>")
  dataTemplate += "</div>"
  modelEmail = modelEmail.replace("%listProducts%", dataTemplate)
  modelEmail = modelEmail.replace("%address%", obj.address.toUpperCase())
  modelEmail = modelEmail.replace("%username%", obj.username.toUpperCase())
  modelEmail = modelEmail.replace("%orderid%", obj.id)
  modelEmail = modelEmail.replace("%name%", obj.username.toUpperCase())
  modelEmail = modelEmail.replace("%order%", obj.id)

  mailgun.messages().send({
    from: 'Ecommerce Patagonia <envios@patagonia.com>',
    to: obj.to,
    subject: 'Enviamos tu pedido!',
    html: modelEmail
  }, function (err, info) {
    if (err) {
      console.error('Error: ' + err);
    } else {
      console.info('Response: ' + info);
    }
  });

  return modelEmail;
}
module.exports = {
  dispatch
}