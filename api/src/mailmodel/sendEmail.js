var fs = require("fs")
const mailgunLoader = require("mailgun-js")
const mailgun = mailgunLoader({
  apiKey: process.env.MAILGUN_KEY,
  domain: process.env.MAILGUN_SECRET,
});

function sendEmail(obj) {
  var modelEmail = fs.readFileSync("./src/mailmodel/index.html", 'utf8', function (err, data) {
    if (err) console.error(err);
    return data
  })

  var dataTemplate = obj.products.reduce(function (acc, product) {
    return `${acc}<a class="imagen" href="${process.env.CALLBACK_URL_BASE || 
        `http://localhost:3000`}/product/${product.id}" style="display: inline-grid;margin: .5em 1em; text-decoration: none; color:#000000;font-weight: 600;">
    <p style="margin-bottom: .5em; text-transform: capitalize;">${product.name}</p>
    <img  style="height: 8em; width: 8em; border-radius: 10%; border: goldenrod solid .2em;"
     src="${product.thumbnail}" />
    <p style="display: block;margin: .5em;">$ ${product.Order_products.unitprice}</p>
    <p style="display: block;margin: .25em;">Cantidad: ${product.Order_products.quantity}</p> 
        </a>`
  }, "<div>")

  dataTemplate += "</div>"
  modelEmail = modelEmail.replace("%transactionamount%", obj.total_compra)
  modelEmail = modelEmail.replace("%listProducts%", dataTemplate)
  modelEmail = modelEmail.replace("%address%", obj.address.toUpperCase())
  modelEmail = modelEmail.replace("%username%", obj.username.toUpperCase())
  modelEmail = modelEmail.replace("%orderid%", obj.id)
  
  mailgun.messages().send({
    from: 'Ecommerce Patagonia <ventas@patagonia.com>',
    to: obj.to, 
    subject: 'Confirmamos tu compra!',
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
  sendEmail
}

