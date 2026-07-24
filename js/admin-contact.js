// ========================================
// 14 TUNES ADMIN CONTACT MANAGEMENT
// ========================================


const API_URL = "http://localhost:5001/api/contact";





// ========================================
// LOAD CONTACT MESSAGES
// ========================================


async function loadMessages(){


try{


const response = await fetch(API_URL);



const data = await response.json();


// API DATA FIX

const messages = data.contacts || [];



const tableBody =
document.getElementById("contactTable");



const noMessages =
document.getElementById("noMessages");



tableBody.innerHTML = "";




if(messages.length === 0){


noMessages.innerHTML =
"No Contact Messages Found";


return;


}



noMessages.innerHTML = "";





messages.forEach(contact=>{


const row =
document.createElement("tr");



row.innerHTML = `



<td>

${contact.name || "N/A"}

</td>





<td>

${
contact.phone

?

`

<a 
href="tel:${contact.phone}"
class="phone-link">

📞 ${contact.phone}

</a>


<br>


<a
href="https://wa.me/${contact.phone}"
target="_blank"
class="whatsapp-link">

💬 WhatsApp

</a>

`

:

"N/A"

}

</td>





<td>

${contact.message || "N/A"}

</td>





<td>

${new Date(
contact.date
).toLocaleDateString()}

</td>





<td>


<button

class="action-btn view-btn"

onclick="viewMessage('${contact._id}')">

👁 View

</button>





<button

class="action-btn delete-btn"

onclick="deleteMessage('${contact._id}')">

🗑 Delete

</button>


</td>



`;



tableBody.appendChild(row);



});



}



catch(error){


console.log(
"Connection Error:",
error
);



const noMessages =
document.getElementById("noMessages");


if(noMessages){

noMessages.innerHTML =
"Server connection failed";

}


}



}









// ========================================
// VIEW MESSAGE
// ========================================


async function viewMessage(id){


try{


const response =
await fetch(

`${API_URL}/${id}`

);



const contact =
await response.json();





alert(

"NAME : "+(contact.name || "N/A")+

"\nEMAIL : "+(contact.email || "N/A")+

"\nPHONE : "+(contact.phone || "N/A")+

"\n\nMESSAGE : "+(contact.message || "N/A")

);



}



catch(error){


console.log(error);


alert(
"Unable to load message"
);


}



}









// ========================================
// DELETE MESSAGE
// ========================================


async function deleteMessage(id){



const confirmDelete =
confirm(
"Delete this message?"
);



if(!confirmDelete)

return;





try{


const response =
await fetch(

`${API_URL}/${id}`,

{

method:"DELETE"

}

);





const result =
await response.json();





alert(

result.message ||

"Message deleted successfully"

);





loadMessages();



}



catch(error){


console.log(error);


alert(
"Delete failed"
);


}



}









// ========================================
// SEARCH FUNCTION
// ========================================


document.addEventListener(
"DOMContentLoaded",
()=>{



const searchInput =
document.getElementById("searchInput");



if(searchInput){



searchInput.addEventListener(
"keyup",
function(){



const value =
this.value.toLowerCase();




const rows =
document.querySelectorAll(
"#contactTable tr"
);





rows.forEach(row=>{


const text =
row.innerText.toLowerCase();



if(text.includes(value)){


row.style.display="";


}

else{


row.style.display="none";


}



});



}

);


}




// LOAD DATA

loadMessages();



}

);