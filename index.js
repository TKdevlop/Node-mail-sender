const express = require("express");
const nodemailer = require("nodemailer");
const bodyPaser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3000;

    // create reusable transporter object using the default SMTP transport
    const mailTransport = nodemailer.createTransport(
        `smtps://sendmail9411@gmail.com:mynameisjeff@smtp.gmail.com`);

    function sendEmail(email, body) {
        const mailOptions = {
            from: `preetykharbanda1970@gmail.com`,
            to: email
        };
        // hmtl message constructions
        mailOptions.subject = 'contact form message';
        mailOptions.html = `<p><b>Name: </b>${body.name}</p>
                            <p><b>Email: </b>${body.email}</p>
                            <p><b>Subject: </b>From Protfolio</p>
                            <p><b>Message: </b>${body.message}</p>`;
        return mailTransport.sendMail(mailOptions);
    }
    app.use(bodyPaser());
app.get("/",(req,res)=>{
    res.send("Only post request")
})
    app.post("/", (req, res) => {

        const meassge = {
            name: req.body.name,
            email: req.body.email,
            message: req.body.message
        }
        sendEmail('tusharkharbanda13@gmail.com', meassge).then(() => {
            return res.status(200).send("Success")
          
            ;
        }).catch(err => res.status(404).send(err))
    })

    app.listen(PORT)