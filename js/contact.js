const contactForm = document.getElementById("contactForm");


contactForm.addEventListener("submit", async (e)=>{

    e.preventDefault();


    const responseBox = document.getElementById("response");


    const contactData = {

        name: document.getElementById("name").value.trim(),

        phone: document.getElementById("phone").value.trim(),

        message: document.getElementById("message").value.trim()

    };



    try {


        const response = await fetch(
            "http://localhost:5001/api/contact",
            {

                method:"POST",

                headers:{
                    "Content-Type":"application/json"
                },

                body:JSON.stringify(contactData)

            }
        );



        const result = await response.json();



        console.log("Server Response:", result);



        if(response.ok && result.success){


            // Clear old candidate name
            localStorage.removeItem("contactName");


            // Save current candidate name
            localStorage.setItem(
                "contactName",
                contactData.name
            );



            // Redirect to success page
            window.location.href =
            "contact-success.html";


        }



        else{


            responseBox.innerHTML =
            result.message || "Message failed";


            responseBox.style.color="red";


        }



    }



    catch(error){


        console.log("Fetch Error:",error);



        responseBox.innerHTML =
        "Cannot connect to server";


        responseBox.style.color="red";


    }



});