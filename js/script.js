/*==========================================
        14 TUNES WEBSITE
===========================================*/

/*==============================
    Smooth Scroll
==============================*/

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function(e){

        e.preventDefault();

        document.querySelector(this.getAttribute("href")).scrollIntoView({

            behavior:"smooth"

        });

    });

});


/*==============================
      Fade Animation
==============================*/

const observer = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.add("show");

        }

    });

});

document.querySelectorAll(".casting-card,.why-box,.step").forEach(el=>{

    el.classList.add("hidden");

    observer.observe(el);

});


/*==============================
      Mobile Menu
==============================*/

const menuBtn=document.querySelector(".menu-btn");

const nav=document.querySelector(".nav-links");

if(menuBtn){

menuBtn.onclick=function(){

nav.classList.toggle("active");

}

}


/*==============================
      Hero Animation
==============================*/

window.addEventListener("load",()=>{

const hero=document.querySelector(".hero-content");

hero.style.opacity="0";

hero.style.transform="translateY(60px)";

setTimeout(()=>{

hero.style.transition="1.5s";

hero.style.opacity="1";

hero.style.transform="translateY(0)";

},300);

});


/*==============================
      Glowing Cursor
==============================*/

const glow=document.createElement("div");

glow.className="cursor-glow";

document.body.appendChild(glow);

document.addEventListener("mousemove",(e)=>{

glow.style.left=e.pageX+"px";

glow.style.top=e.pageY+"px";

});


/*==============================
      Floating Stars
==============================*/

function createStar(){

const star=document.createElement("span");

star.className="star";

star.style.left=Math.random()*window.innerWidth+"px";

star.style.animationDuration=(3+Math.random()*5)+"s";

document.body.appendChild(star);

setTimeout(()=>{

star.remove();

},7000);

}

setInterval(createStar,300);


/*==============================
      Typing Effect
==============================*/

const title=document.querySelector(".hero-content h2");

const text=title.innerHTML;

title.innerHTML="";

let i=0;

function typing(){

if(i<text.length){

title.innerHTML+=text.charAt(i);

i++;

setTimeout(typing,80);

}

}

typing();


/*==============================
      Navbar Background
==============================*/

window.addEventListener("scroll",()=>{

const navbar=document.querySelector(".navbar");

if(window.scrollY>100){

navbar.style.background="rgba(0,0,0,.85)";

}

else{

navbar.style.background="rgba(0,0,0,.45)";

}

});


/*==============================
      Button Ripple
==============================*/

document.querySelectorAll(".btn").forEach(button=>{

button.addEventListener("click",function(e){

const circle=document.createElement("span");

const diameter=Math.max(button.clientWidth,button.clientHeight);

circle.style.width=diameter+"px";

circle.style.height=diameter+"px";

circle.style.left=e.offsetX-diameter/2+"px";

circle.style.top=e.offsetY-diameter/2+"px";

circle.classList.add("ripple");

button.appendChild(circle);

setTimeout(()=>{

circle.remove();

},600);

});

}); const light=document.createElement("div");

light.className="mouse-light";

document.body.appendChild(light);

document.addEventListener("mousemove",(e)=>{

light.style.left=e.clientX+"px";

light.style.top=e.clientY+"px";

});