/* =====================================================
        14 TUNES PREMIUM ADMIN PANEL
        OPTIMIZED VERSION
===================================================== */


/* =====================================================
        API URLS
===================================================== */
const USER_API =
"https://one4-tunes-backend-1.onrender.com/api/users";


const CONTACT_API =
"https://one4-tunes-backend-1.onrender.com/api/contact";


/* =====================================================
        LOGIN CHECK
===================================================== */

const token =
localStorage.getItem("adminToken");


if(!token){

    localStorage.clear();

    window.location.href =
    "admin-login.html";

}




/* =====================================================
        ELEMENTS
===================================================== */


const userList =
document.getElementById("userList");


const searchInput =
document.getElementById("searchInput");


const noUsers =
document.getElementById("noUsers");


const totalUsers =
document.getElementById("totalUsers");


const maleUsers =
document.getElementById("maleUsers");


const femaleUsers =
document.getElementById("femaleUsers");


const childUsers =
document.getElementById("childUsers");


const activeUsers =
document.getElementById("activeUsers");


const blockedUsers =
document.getElementById("blockedUsers");


const contactCount =
document.getElementById("contactCount");





/* =====================================================
        GLOBAL VARIABLES
===================================================== */


let users=[];

let loading=false;

let refreshTimer;





/* =====================================================
        LOAD USERS
===================================================== */


async function loadUsers(){


    if(loading)
    return;


    loading=true;


    try{


        const response =
        await fetch(USER_API);



        if(!response.ok){

            throw new Error(
                "User API Error"
            );

        }



        users =
        await response.json();



        console.log(
            "Users Loaded",
            users
        );



        updateStatistics();

        displayUsers(users);



    }


    catch(error){


        console.log(
            "Loading Error",
            error
        );


        if(noUsers){

            noUsers.innerHTML =
            "Server Connection Error";

        }


    }


    finally{

        loading=false;

    }


}






/* =====================================================
        STATISTICS
===================================================== */


function updateStatistics(){


let male=0;

let female=0;

let child=0;

let active=0;

let blocked=0;



users.forEach(user=>{


const gender =
(user.gender||"")
.toLowerCase();


const role =
(user.role||"")
.toLowerCase();



if(gender==="male")
male++;


if(gender==="female")
female++;


if(role.includes("child"))
child++;


if(user.status==="Active")
active++;


if(user.status==="Blocked")
blocked++;



});




if(totalUsers)
totalUsers.textContent =
users.length;


if(maleUsers)
maleUsers.textContent =
male;


if(femaleUsers)
femaleUsers.textContent =
female;


if(childUsers)
childUsers.textContent =
child;


if(activeUsers)
activeUsers.textContent =
active;


if(blockedUsers)
blockedUsers.textContent =
blocked;



}







/* =====================================================
        DISPLAY USERS
===================================================== */


function displayUsers(data){



if(!userList)
return;



userList.innerHTML="";



if(data.length===0){


if(noUsers)

noUsers.innerHTML =
"No Registered Users Found";


return;


}



noUsers.innerHTML="";



const fragment =
document.createDocumentFragment();



data.forEach(user=>{


const row =
document.createElement("tr");



row.innerHTML=`

<td>${user.name}</td>

<td>${user.age}</td>

<td>${user.gender}</td>

<td>${user.role}</td>


<td>

<a class="phone-link"
href="tel:${user.phone}">

📞 ${user.phone}

</a>

</td>


<td>${user.address}</td>



<td>

<select
onchange="updateStatus('${user._id}',this.value)">


<option value="Active"
${user.status==="Active"?"selected":""}>

Active

</option>


<option value="Blocked"
${user.status==="Blocked"?"selected":""}>

Blocked

</option>


</select>

</td>



<td>

<button
class="delete-btn"
onclick="deleteUser('${user._id}')">

Delete

</button>

</td>

`;



fragment.appendChild(row);



});



userList.appendChild(fragment);



}









/* =====================================================
        DELETE USER
===================================================== */


async function deleteUser(id){


if(!confirm(
"Delete this user?"
))
return;



try{


await fetch(

USER_API+"/"+id,

{

method:"DELETE"

}

);



alert(
"User Deleted Successfully"
);



loadUsers();



}

catch(error){


console.log(error);


alert(
"Delete Failed"
);


}



}



window.deleteUser =
deleteUser;









/* =====================================================
        UPDATE STATUS
===================================================== */


async function updateStatus(id,status){


try{


await fetch(

USER_API+"/"+id,

{

method:"PATCH",

headers:{

"Content-Type":
"application/json"

},

body:JSON.stringify({

status

})

}

);



loadUsers();



}

catch(error){


console.log(error);


}



}



window.updateStatus =
updateStatus;









/* =====================================================
        SEARCH
===================================================== */


if(searchInput){


searchInput.addEventListener(
"input",
function(){



const value =
this.value.toLowerCase();



const filtered =
users.filter(user=>{


return(

(user.name||"")
.toLowerCase()
.includes(value)



||

(user.phone||"")
.toLowerCase()
.includes(value)



||

(user.address||"")
.toLowerCase()
.includes(value)



||

(user.role||"")
.toLowerCase()
.includes(value)



);


});



displayUsers(filtered);



});


}









/* =====================================================
        CONTACT COUNT
===================================================== */


async function loadContactCount(){


try{


const response =
await fetch(CONTACT_API);



const data =
await response.json();



let contacts=[];



if(Array.isArray(data)){

contacts=data;

}

else if(data.contacts){

contacts=data.contacts;

}



if(contactCount)

contactCount.textContent =
contacts.length;



}

catch(error){


console.log(
"Contact Error",
error
);


}



}









/* =====================================================
        LOGOUT
===================================================== */


function logout(){


localStorage.removeItem(
"adminToken"
);


localStorage.removeItem(
"adminLogin"
);



window.location.href =
"admin-login.html";


}



window.logout =
logout;









/* =====================================================
        MOBILE SIDEBAR
===================================================== */


const menuBtn =
document.getElementById("menuBtn");


const sidebar =
document.getElementById("sidebar");


const overlay =
document.getElementById("overlay");



if(menuBtn){


menuBtn.onclick=function(){


sidebar.classList.toggle("active");

overlay.classList.toggle("active");


};


}



if(overlay){


overlay.onclick=function(){


sidebar.classList.remove("active");

overlay.classList.remove("active");


};


}









/* =====================================================
        DASHBOARD REFRESH
===================================================== */


async function refreshDashboard(){


await loadUsers();


await loadContactCount();



}









/* =====================================================
        PAGE START
===================================================== */


window.addEventListener(
"load",
()=>{


console.log(
"14 TUNES ADMIN READY"
);



refreshDashboard();



/*
AUTO REFRESH
*/

refreshTimer =
setInterval(()=>{


if(document.visibilityState==="visible"){

refreshDashboard();

}


},30000);



});







/* STOP TIMER WHEN EXIT */


window.addEventListener(
"beforeunload",
()=>{


clearInterval(refreshTimer);


});