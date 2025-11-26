let slideIndex =0;
const slides = document.querySelectorAll(".slide"); //Gets All Classes Having Slide Name


//For Greeting Acc to time
function getGreeting()
{
    //Gets New Date For Taking Hours in 24 hours format
    const hour =new Date().getHours()

    //From 5 AM TO 12 pm
    if(hour>=5 && hour<12)
    {
        return "Good Morning!";
    }

    //From 12 pm to 6pm
    if(hour>=12 && hour <18)
    {
        return "Good Afternoon!";
    }

    //From 6pm to 5am
    return "Good Night!";
}

function setGreeting()
{
    //Stores Greeting Message In A Constant
    const greet = getGreeting();

    //Gets All h1 that have an id of greeting and changes its each TEXT to the greeting stored in greet
    document.querySelectorAll("h1[id^='greeting']").forEach(t => {
        t.textContent = greet;
    });
}

setGreeting();


function switchSlides()
{
    slides.forEach(slide => slide.classList.remove("active")); //Removes Active Class For EACH Slides

    slideIndex++; //Swithc To Next Slide
    if(slideIndex> slides.length) //slide.length is the length of slide (3)
    {
        slideIndex =1; //If Slide Index Exceeds The Length Then Reset it
    }

    slides[slideIndex-1].classList.add("active"); //Add Active Keyword To Current Slide (slidIndex-1) to make it work
}

//Calling The Function Every 3seconds
setInterval(switchSlides,3000);



const backToTop = document.getElementById("backToTop");

//Button Appearance 
window.addEventListener("scroll", () => {
    if (window.scrollY > 300) { //Scroll Y is scrolling horizontally
        backToTop.classList.add("show"); /*Add Show In Class List So That The Button Appears*/ 
    } 
    else {
        backToTop.classList.remove("show"); /*Remove THe Button From The Screen iF the button is already at the top*/
    }
});

//Now When It Is Cicked It Takes To Top Smoothly
backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});