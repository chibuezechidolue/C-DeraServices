import nodemailer from "nodemailer";
import 'dotenv/config';

 // Send Email ///

 export function sendEmail({subject,content,emailUser,emailPass}){
    var transporter = nodemailer.createTransport({
        port: 465,               // true for 465, false for other ports
        host: "smtp.gmail.com",
           auth: {
                user: emailUser,
                pass: emailPass,
             },
        secure: true,
        });

 var mailOptions = {
    from: emailUser,  // sender address
        to: emailUser,   // list of receivers
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

   