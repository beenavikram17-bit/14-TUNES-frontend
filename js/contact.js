/* =================================
   14 TUNES CONTACT FORM JS
================================= */


document.addEventListener("DOMContentLoaded", function () {


    const contactForm = document.getElementById("contactForm");


    contactForm.addEventListener("submit", function (event) {


        event.preventDefault();



        const name = document.querySelector(
            "input[type='text']"
        ).value.trim();



        const phone = document.querySelector(
            "input[type='tel']"
        ).value.trim();



        const message = document.querySelector(
            "textarea"
        ).value.trim();



        // Validation

        if (
            name === "" ||
            phone === "" ||
            message === ""
        ) {


            alert("Please fill all details!");

            return;


        }



        // Save name for success page

        localStorage.setItem(
            "contactName",
            name
        );



        // Redirect to contact success page

        window.location.href = "contact-success.html";


    });


});