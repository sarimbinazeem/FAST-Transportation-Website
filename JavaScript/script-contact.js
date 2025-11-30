const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", (e) => {
    e.preventDefault(); // prevents the page to refresh or go to nother website

    alert("Your message has been sent!");

    contactForm.reset(); // Clear All The Text Written in Form
});