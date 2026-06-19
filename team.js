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

});