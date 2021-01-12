const server = require("express").Router();
const mailgunLoader = require("mailgun-js")

const mailgun = mailgunLoader({
    apiKey: "ee88a4918226f8f65ddd7b1d2b21a3f8-3d0809fb-f6bf0951",
    domain: "sandbox2b110fa331aa4c138c477da2dc662ad1.mailgun.org"
});

const sendEmail = (to, from, subject, content) => {
    const data = {
        to,
        from,
        subject,
        text: content
    }
    return mailgun.messages().send(data);
};

server.post('/vaca', async (req, res) => {
    try {
        await sendEmail("alan.lsnake.93@gmail.com", "pelado@gil.com", "no quiero", "https://i.pinimg.com/564x/c9/c3/35/c9c335668d2c6c80f9b43ed07257dce4.jpg")
        res.send("email, enviado")
    } catch (e) {
        console.log(e);
        res.status(500)
    }
})

module.exports = server;