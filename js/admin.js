/* =====================================
        14 TUNES ADMIN USER MANAGEMENT
        JWT AUTH CONNECTED
===================================== */


// ===============================
// API CONFIGURATION
// ===============================

const API_URL =
"https://one4-tunes-backend.onrender.com/api/users";




// ===============================
// CHECK ADMIN TOKEN
// ===============================

const token =
localStorage.getItem("adminToken");



if(!token){

    alert("Please login first.");

    window.location.href =
    "admin-login.html";

}




// ===============================
// JWT HEADERS
// ===============================

function getHeaders(){


    return {


        "Content-Type":"application/json",


        "Authorization":

        `Bearer ${token}`


    };


}






// ===============================
// ELEMENTS
// ===============================


let users = [];


const userList =
document.getElementById("userList");


const searchInput =
document.getElementById("searchInput");






// ===============================
// LOAD USERS
// ===============================


async function loadUsers(){


    try{


        const response =

        await fetch(

            API_URL,

            {

                method:"GET",

                headers:getHeaders()

            }

        );





        if(response.status === 401){


            logout();


            return;


        }






        users =

        await response.json();




        displayUsers();



    }



    catch(error){


        console.log(error);



        if(userList){


            userList.innerHTML = `


            <tr>

            <td colspan="8">

            Backend Server Not Connected

            </td>

            </tr>


            `;


        }


    }


}







// ===============================
// DISPLAY USERS
// ===============================


function displayUsers(){


    if(!userList){

        return;

    }



    userList.innerHTML = "";




    if(users.length === 0){


        userList.innerHTML = `


        <tr>

        <td colspan="8">

        No Registered Users Found

        </td>

        </tr>


        `;


        return;

    }






    users.forEach((user)=>{


        let row =
        document.createElement("tr");



        row.innerHTML = `


        <td>${user.name}</td>


        <td>${user.age}</td>


        <td>${user.gender}</td>


        <td>${user.role}</td>


        <td>${user.phone}</td>


        <td>${user.address}</td>



        <td>


        <select

        onchange="updateStatus('${user._id}',this.value)">



        <option value="Active"

        ${user.status==="Active" ? "selected":""}>

        Active

        </option>



        <option value="Blocked"

        ${user.status==="Blocked" ? "selected":""}>

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



        userList.appendChild(row);



    });



}







// ===============================
// DELETE USER
// ===============================


async function deleteUser(id){


    if(!confirm(

    "Are you sure you want to delete this user?"

    )){


        return;

    }






    try{


        const response =

        await fetch(


            API_URL + "/" + id,


            {


                method:"DELETE",


                headers:getHeaders()


            }


        );





        if(response.status === 401){


            logout();


            return;

        }






        const data =

        await response.json();




        alert(data.message);



        loadUsers();



    }



    catch(error){


        console.log(error);


        alert(

        "Delete failed"

        );


    }



}


window.deleteUser =
deleteUser;







// ===============================
// UPDATE STATUS
// ===============================


async function updateStatus(id,status){



    try{


        const response =

        await fetch(


            API_URL + "/" + id,


            {


                method:"PATCH",


                headers:getHeaders(),



                body:JSON.stringify({

                    status:status

                })


            }


        );






        if(response.status === 401){


            logout();


            return;

        }






        const data =

        await response.json();




        alert(data.message);



    }


    catch(error){


        console.log(error);


        alert(

        "Status update failed"

        );


    }



}



window.updateStatus =
updateStatus;








// ===============================
// LOGOUT
// ===============================


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






// ===============================
// INITIAL LOAD
// ===============================


loadUsers();







// ===============================
// SEARCH USERS
// ===============================


if(searchInput){


    searchInput.addEventListener(

    "keyup",

    function(){


        let value =

        this.value.toLowerCase();




        document.querySelectorAll(

        "#userList tr"

        )

        .forEach(row=>{


            row.style.display =


            row.innerText

            .toLowerCase()

            .includes(value)

            ?

            ""

            :

            "none";



        });



    });



}






// ===============================
// MOBILE SIDEBAR
// ===============================


const menuBtn =
document.getElementById("menuBtn");


const sidebar =
document.getElementById("sidebar");


const overlay =
document.getElementById("overlay");




if(menuBtn && sidebar && overlay){


    menuBtn.onclick = ()=>{


        sidebar.classList.toggle("active");

        overlay.classList.toggle("active");


    };



    overlay.onclick = ()=>{


        sidebar.classList.remove("active");

        overlay.classList.remove("active");


    };


}





console.log(

"14 TUNES ADMIN PANEL JWT SECURITY ACTIVE ✅"

);