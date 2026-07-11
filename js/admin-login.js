// ===============================
// 14 TUNES ADMIN LOGIN
// JWT AUTH CONNECTED
// ===============================


const API_URL =
"https://one4-tunes-backend.onrender.com/api/admin/login";





async function login(){


    let username =
    document.getElementById("username").value.trim();



    let password =
    document.getElementById("password").value.trim();




    if(username === "" || password === ""){


        document.getElementById("error").innerHTML =
        "❌ Please enter Username and Password";


        return;


    }





    try{


        const response =
        await fetch(

        API_URL,

        {

            method:"POST",


            headers:{


                "Content-Type":"application/json"


            },


            body:JSON.stringify({


                username:username,


                password:password



            })


        }


        );






        const data =
        await response.json();






        if(response.ok){



            // Store login status

            localStorage.setItem(

            "adminLogin",

            "true"

            );




            // Store JWT Token

            localStorage.setItem(

            "adminToken",

            data.token

            );





            window.location.href =
            "admin.html";



        }


        else{


            document.getElementById("error").innerHTML =

            "❌ " + data.message;



        }





    }


    catch(error){



        console.log(error);



        document.getElementById("error").innerHTML =

        "❌ Backend Server Not Connected";



    }



}