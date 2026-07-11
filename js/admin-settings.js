/* =====================================
        14 TUNES ADMIN SETTINGS
===================================== */



// ===============================
// LOAD ADMIN DATA
// ===============================


let adminData =

JSON.parse(
localStorage.getItem("adminData")
)

|| {


name:"Admin",

email:"admin@14tunes.com"


};






document.getElementById("adminName").value =
adminData.name;



document.getElementById("adminEmail").value =
adminData.email;









// ===============================
// SAVE PROFILE
// ===============================


const saveProfile =
document.getElementById("saveProfile");





saveProfile.addEventListener(
"click",
function(){



let profile = {


name:

document.getElementById("adminName").value,



email:

document.getElementById("adminEmail").value



};





localStorage.setItem(

"adminData",

JSON.stringify(profile)

);





alert(

"Profile Saved Successfully"

);



});









// ===============================
// CHANGE PASSWORD
// ===============================


const changePassword =
document.getElementById("changePassword");





changePassword.addEventListener(
"click",
function(){



let oldPassword =

document.getElementById("oldPassword").value;





let newPassword =

document.getElementById("newPassword").value;






let savedPassword =

localStorage.getItem("adminPassword")

|| "admin123";








if(oldPassword !== savedPassword){



alert(

"Current Password is Wrong"

);



return;


}







if(newPassword.length < 5){



alert(

"Password must contain minimum 5 characters"

);



return;


}







localStorage.setItem(

"adminPassword",

newPassword

);







alert(

"Password Updated Successfully"

);







document.getElementById("oldPassword").value="";

document.getElementById("newPassword").value="";



});









// ===============================
// WEBSITE SETTINGS
// ===============================


const saveWebsite =
document.getElementById("saveWebsite");





saveWebsite.addEventListener(
"click",
function(){



let status =

document.getElementById("siteStatus").value;







localStorage.setItem(

"websiteStatus",

status

);





alert(

"Website Settings Saved"

);



});