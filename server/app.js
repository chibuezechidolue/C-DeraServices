import express from "express";
import { sendEmail } from "./utils/mail.js";
import 'dotenv/config';
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
    const domainName = req.hostname;
    // const domainName = "cderaservices.com"

    let parentDomain=domainName=="cderaservices.com" ? true : false
    res.locals={
        "parentDomain":parentDomain,
        "company":{
            "name": parentDomain ? "C'dera Services" : "ChidaveAstro Services",
            "email": parentDomain ? "cdera.services@gmail.com" : "chidaveastro@gmail.com",
            "phone": parentDomain ? "+2347062690661" : "+2347062690661",
            "address": parentDomain ? "107 Old Aba Rd, Rumuobiakani, River State" : "107 Old Aba Rd, Rumuobiakani, River State",
            "socials": parentDomain ? {"facebook":"#","instagram":"https://www.instagram.com/cdera.services/?igsh=NTc4MTIwNjQ2YQ%3D%3D","whatsapp":"https://wa.link/gx8cmw"} : {"facebook":"#","instagram":"https://www.instagram.com/cdera.services/?igsh=NTc4MTIwNjQ2YQ%3D%3D","whatsapp":"https://wa.link/gx8cmw"},
            "yearIncorporated":parentDomain ? "2019" : "2024",
        }
     }
    next();
}

// middlewares//
app.use(express.static("../public"));
app.use(express.urlencoded({extended:true}));
app.use(myMiddleware);


app.get("/",(req,res)=>{
    const chidaveAstro= {
        "first":{"name":"Tracy Samoukas","review":"“I couldn’t be happier with the transformation of my home, thanks to Chidaveastro Services The team took the time to understand my vision and created a space that feels both stylish and functional. From selecting the perfect color palette to arranging furniture in a way that maximizes space, everything was done with such attention to detail. Highly recommend!”"},
        "second":{"name":"Nwachukwu Melvin","review":'"Chidaveastro Services exceeded all of my expectations! Their design expertise brought new life to my bedroom. The layout feels more open, and the decor adds the perfect blend of modern elegance with a touch of warmth. The process was smooth and the team was incredibly professional. I love spending time in my home now!”'},
        "third":{"name":" Dr. Bryan Chibuzor Nwala","review":'“Working with Chidaveastro Services was an amazing experience. They turned my small apartment into a cozy and stylish retreat. The team was so creative in maximizing space while keeping everything sleek and contemporary. Every detail was carefully thought out. I truly appreciate their professionalism and the personal touch they brought to the project.”'}
    }
    
    const cderaServices= {
        "first":{"name":"IDI HC Services","review":'“I’ve been sourcing materials from Cdera  Services for my construction projects for over a year now, and I’m always impressed by their consistency and quality. The plywood I purchased was top-notch, durable, and perfectly suited for my needs. Their timely delivery and excellent customer service make them my go-to supplier for all construction materials.”'},
        "second":{"name":"Somtochukwu Nwizu","review":'“Cdera Services Limited provided me with high-quality plywood for my renovation project, and I couldn’t be happier with the results. The team was incredibly helpful in recommending the right type of plywood for my needs, and the products were delivered on time and in perfect condition. Their competitive pricing and reliability make them a standout supplier!”'},
        "third":{"name":" Illume Development limited","review":'“I’ve worked with many suppliers in the past, but Cdera Services Limited stands out. They offer a wide selection of high-quality plywood and construction materials that are both durable and reasonably priced. Their team is always knowledgeable, and they go above and beyond to ensure that I have everything I need for my projects. I highly recommend them!”'}
    }
    let clientReviews= res.locals.parentDomain ? cderaServices : chidaveAstro
    res.render("../views/index.ejs",{"reviews":clientReviews});
});



app.all("/contact-us",(req,res)=>{
    if (req.method=="GET"){
    res.render("../views/contact-us.ejs")
    }else if (req.method=="POST"){
    
        const {name,email,phone,message} = req.body
        let msgSubject = `Message From Your Website (${res.locals.parentDomain ? "cderaservices.com" : "chidaveastro.com"})`
        let msgContent=`Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message} `;
        
        // send the content of the form as a mail //
        const EMAIL = res.locals.parentDomain ? process.env.CDERA_EMAIL_USERNAME : process.env.CHIDAVE_EMAIL_USERNAME;
        const PASSWORD=res.locals.parentDomain ? process.env.CDERA_EMAIL_PASSWORD : process.env.CHIDAVE_EMAIL_PASSWORD;
        sendEmail({subject:msgSubject,content:msgContent,emailUser:EMAIL,emailPass:PASSWORD,});
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