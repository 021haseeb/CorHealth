document.addEventListener("DOMContentLoaded",()=>{

const reveals=document.querySelectorAll(".reveal");

const observer=new IntersectionObserver((entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("active");

}

});

},{
threshold:.15
});

reveals.forEach(item=>{
observer.observe(item);
});

const form=document.getElementById("contactForm");
const success=document.getElementById("successMessage");

form.addEventListener("submit",(e)=>{

e.preventDefault();

success.innerHTML="✅ Message Sent Successfully";

success.style.marginTop="20px";
success.style.color="#0f4c81";
success.style.fontWeight="600";

form.reset();

});

});