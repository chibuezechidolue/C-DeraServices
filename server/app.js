import express from "express";
import { sendEmail } from "./utils/mail.js";
// import { fileURLToPath } from 'url';
// import path, { dirname } from 'path';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);
// app.use(express.static(path.join(__dirname,"../public")));





const app = express();
const port = process.env.PORT || 3000;


app.set('views', '../views');
// app.set('view engine', 'html');

function  myMiddleware(req,res,next){
    // const domainName = req.headers.host;
    // const domainName = req.hostname;
    const domainName = "cderaservices.com"

     let parentDomain=domainName=="cderaservices.com" ? true : false
     res.locals={
        "parentDomain":parentDomain,
        "company":{
            "name": parentDomain ? "C'dera Services" : "ChidaveAstro Services",
            "email": parentDomain ? "cdera.services@gmail.com" : "chidaveastro@gmail.com",
            "phone": parentDomain ? "+2347062690661" : "+2347062690661",
            "address": parentDomain ? "107 Old Aba Rd, Rumuobiakani, River State" : "107 Old Aba Rd, Rumuobiakani, River State",
            "socials": parentDomain ? {"facebook":"","instagram":"","whatsapp":""} : {"facebook":"","instagram":"","whatsapp":""}
        }
     }
    next();
}

// middlewares//
app.use(express.static("../public"));
app.use(express.urlencoded({extended:true}));
app.use(myMiddleware);


app.get("/",(req,res)=>{
    // if(req.query.success){
    //     res.locals.message = "Your Message was sent successfully"
    // }       
    res.render("../views/index.ejs");
});



app.all("/contact-us",(req,res)=>{
    if (req.method=="GET"){
    res.render("../views/contact-us.ejs")
    }else if (req.method=="POST"){
        const {name,email,phone,message} = req.body
        console.log(name,email,phone,message)
        let msgSubject = "Message from DeraServices";
        let msgContent=`Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message} `;
        
        // send the content of the form as a mail //
        sendEmail({subject:msgSubject,content:msgContent});

        res.render("../views/contact-us.ejs",{message:"Your Message was sent successfully"})
        // res.redirect("/?success=" + encodeURIComponent('Message Sent'));
    }
})

app.get("/about-us", (req,res)=>{
    res.render("../views/about-us.ejs");
})
// Service Routes //
app.get("/service/interior-design",(req,res)=>{
    res.render("../views/services/interior-design.ejs");
})

app.get("/service/furniture-design",(req,res)=>{
    res.render("../views/services/furniture-design.ejs");
})

app.get("/service/material-supply",(req,res)=>{
    res.render("../views/services/material-supply.ejs");
})

// Projects Routes //
app.get("/projects",(req,res)=>{
    res.render("../views/projects.ejs")
})



app.listen(port, ()=>{
    console.log(`server running on port ${port}`);
})