/* =================================
        14 TUNES REGISTER SYSTEM
        MongoDB API Connection
================================= */


const registerForm =
document.getElementById("castingForm");


registerForm.addEventListener(
"submit",
async function(event){


event.preventDefault();



const user = {


name:
document.getElementById("name").value,


age:
document.getElementById("age").value,


gender:
document.getElementById("gender").value,


role:
document.getElementById("role").value,


phone:
document.getElementById("phone").value,


address:
document.getElementById("address").value


};




try{


const response = await fetch(
"https://one4-tunes-backend.onrender.com/api/users/register",
{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify(user)

}

);



const data = await response.json();




if(response.ok){


alert(
"Registration Successful 🎬"
);


window.location.href =
"success.html";


}

else{


alert(data.message);

}


}


catch(error){


console.log(error);


alert(
"Backend server not connected"
);


}



});
