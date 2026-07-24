/* ==========================================
   14 TUNES CASTING REGISTRATION
   PRODUCTION VERSION
========================================== */


const API_URL =
"https://one4-tunes-backend-1.onrender.com";



const form =
document.getElementById("castingForm");


const roleInput =
document.getElementById("role");


const roleCards =
document.querySelectorAll(".role-card");



/* ==========================================
   ROLE SELECTION
========================================== */


roleCards.forEach(card=>{


card.addEventListener("click",()=>{


roleCards.forEach(c=>{

c.classList.remove("selected");

});


card.classList.add("selected");


roleInput.value =
card.dataset.role;


});


});





/* ==========================================
   PHONE VALIDATION
========================================== */


const phone =
document.getElementById("phone");



phone.addEventListener("input",function(){


this.value =
this.value.replace(/\D/g,"");



if(this.value.length>10){

this.value =
this.value.slice(0,10);

}


});





/* ==========================================
   AGE LIMIT
========================================== */


const age =
document.getElementById("age");



age.addEventListener("input",function(){


if(this.value<1){

this.value="";

}


if(this.value>80){

this.value=80;

}


});





/* ==========================================
   SUBMIT FORM
========================================== */


form.addEventListener(
"submit",
async function(e){


e.preventDefault();



const name =
document.getElementById("name")
.value.trim();


const gender =
document.getElementById("gender")
.value;


const address =
document.getElementById("address")
.value.trim();


const role =
roleInput.value;





if(name===""){

alert("Enter Full Name");
return;

}



if(age.value===""){

alert("Enter Age");
return;

}



if(gender===""){

alert("Select Gender");
return;

}



if(phone.value.length!==10){

alert("Enter Valid Phone Number");
return;

}



if(address===""){

alert("Enter Address");
return;

}



if(role===""){

alert("Select Casting Role");
return;

}





const candidateData={


name:name,

age:Number(age.value),

gender:gender,

role:role,

phone:phone.value,

address:address


};





const btn =
form.querySelector("button");



btn.disabled=true;


btn.innerHTML=
`
<i class="fa-solid fa-spinner fa-spin"></i>
Submitting...
`;





try{


const response =
await fetch(

"https://one4-tunes-backend-1.onrender.com/api/users/register",

{

method:"POST",

headers:{

"Content-Type":
"application/json"

},

body:
JSON.stringify(candidateData)

}

);




const result =
await response.json();



console.log(result);




if(response.ok){


localStorage.setItem(
"castName",
name
);


localStorage.setItem(
"castRole",
role
);



window.location.href=
"success.html";



}

else{


alert(
result.message ||
"Registration Failed"
);


btn.disabled=false;


}



}

catch(error){


console.log(error);


alert(
"Server Connection Failed"
);


btn.disabled=false;


}



});






/* ==========================================
   CARD ANIMATION
========================================== */


roleCards.forEach(card=>{


card.addEventListener(
"mouseenter",
()=>{


if(!card.classList.contains("selected")){


card.style.transform=
"translateY(-10px) scale(1.03)";


}


});




card.addEventListener(
"mouseleave",
()=>{


if(!card.classList.contains("selected")){


card.style.transform="";


}


});


});






/* ==========================================
   PAGE ANIMATION
========================================== */


window.addEventListener(
"load",
()=>{


document
.querySelectorAll(".form-section")
.forEach((section,index)=>{


section.style.opacity="0";

section.style.transform=
"translateY(50px)";



setTimeout(()=>{


section.style.transition=".7s";

section.style.opacity="1";

section.style.transform=
"translateY(0)";


},index*250);



});


});