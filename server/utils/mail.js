import nodemailer from "nodemailer";
import 'dotenv/config';

 // Send Email ///

 export function sendEmail(subject,content,options){
    var transporter = nodemailer.createTransport({
        port: 465,               // true for 465, false for other ports
        host: "smtp.gmail.com",
           auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD,
             },
        secure: true,
        });

 var mailOptions = {
    from: process.env.EMAIL_USERNAME,  // sender address
        to: process.env.EMAIL_USERNAME,   // list of receivers
        subject: subject,
        text: content,
        // html: '<b>Hey there! </b> <br> This is our first message sent with Nodemailer<br/>',
        
        // An array of attachments
    // attachments: [
    //     {
    //         filename: '1.png',
    //         path: '../public/images/1.png',
    //     },
    //         ]
    };
    transporter.sendMail(mailOptions, function (err, info) {
        if(err)
            console.log(err)
        else
            console.log(info);
        });


    };

   