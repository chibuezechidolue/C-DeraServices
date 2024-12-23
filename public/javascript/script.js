


const currentPage=location.href.substring(location.href.lastIndexOf("/"),500)

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