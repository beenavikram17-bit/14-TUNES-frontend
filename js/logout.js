/* =====================================
        14 TUNES ADMIN LOGOUT
===================================== */



// Remove admin session


localStorage.removeItem(
"adminLogin"
);



// Redirect to login page


setTimeout(function(){


window.location.href =
"admin-login.html";


},1500);