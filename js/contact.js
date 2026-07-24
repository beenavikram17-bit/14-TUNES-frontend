/* ==========================================
      14 TUNES CONTACT FORM
      PRODUCTION VERSION
========================================== */


const API_URL =
"https://one4-tunes-backend-1.onrender.com/api/contact";



const contactForm =
document.getElementById("contactForm");




contactForm.addEventListener(
"submit",
async(e)=>{


e.preventDefault();



const responseBox =
document.getElementById("response");



const contactData={


name:
document.getElementById("name")
.value.trim(),



phone:
document.getElementById("phone")
.value.trim(),



message:
document.getElementById("message")
.value.trim()


};





try{


const response =
await fetch(

API_URL+
"https://one4-tunes-backend-1.onrender.com/api/contact",

{

method:"POST",

headers:{

"Content-Type":
"application/json"

},

body:
JSON.stringify(contactData)

}

);





const result =
await response.json();



console.log(result);





if(response.ok && result.success){


localStorage.setItem(
"contactName",
contactData.name
);



window.location.href=
"contact-success.html";


}

else{


responseBox.innerHTML=
result.message ||
"Message Failed";


responseBox.style.color=
"red";


}



}



catch(error){


console.log(error);


responseBox.innerHTML=
"Server Connection Failed";


responseBox.style.color=
"red";


}



});