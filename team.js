document.addEventListener("DOMContentLoaded",()=>{

const reveals=document.querySelectorAll(".reveal");

// Mobile navbar toggle + close on nav click
(function setupNav() {
  const menuBtn = document.querySelector(".menu-btn");
  const navLinks = document.querySelector(".nav-links");
  if (!menuBtn || !navLinks) return;

  const setExpanded = (expanded) => {
    menuBtn.setAttribute("aria-expanded", expanded ? "true" : "false");
    navLinks.classList.toggle("active", expanded);
  };

  menuBtn.addEventListener("click", () => {
    const expanded = menuBtn.getAttribute("aria-expanded") !== "true";
    setExpanded(expanded);
  });

  navLinks.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => setExpanded(false));
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setExpanded(false);
  });
})();

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
