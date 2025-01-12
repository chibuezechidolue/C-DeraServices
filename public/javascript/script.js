


const currentPage=location.href.substring(location.href.lastIndexOf("/"),500);
// // console.log(location.origin,location.host,location.hostname);
// const domainName = location.hostname
// // const domainName = "cderaservices.com"

// function setLogo(domainName){
//     let logos = document.querySelectorAll(".logoImg")
//     if (domainName=="cderaservices.com"){
//         logos.forEach((logo)=>{
//             logo.setAttribute("src","../images/cderaservicesLogo.png")
//         })
//     }else{
//         logos.forEach((logo)=>{
//             logo.setAttribute("src","../images/chidaveastroLogo.png")
//         })
//     }
// }
// setLogo(domainName);

if(currentPage=="/"){
    document.getElementById("home").style.color="#FFCA2C";
}else if (currentPage=="/about-us"){
    document.getElementById("about-us").style.color="#FFCA2C";
}else if (currentPage=="/contact-us"){
    document.getElementById("contact-us").style.color="#FFCA2C";
}else if (currentPage=="/projects"){
    document.getElementById("projects").style.color="#FFCA2C";
}else{
    document.getElementById("services").style.color="#FFCA2C";
}