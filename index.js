const express = require("express");
const nodemailer = require("nodemailer");
const bodyPaser = require("body-parser");

const cors = require('cors'); 
const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
    const mailTransport = nodemailer.createTransport(
        `smtps://your email:your pass@smtp.gmail.com`);

    function sendEmail(email, body) {
        const mailOptions = {
            from: ``,
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
        sendEmail('sender', meassge).then(() => {
            return res.status(200).send("Success")
          
            ;
        }).catch(err => res.status(404).send(err))
    })
    app.listen(PORT, () => {
        console.log(`Started up at port ${PORT}`);
      })
      