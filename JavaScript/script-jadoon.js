//Function To Retrieve Routes By Searching
function filterRoutes() {
    //Get The Search Bar And Store In Variable
    const input = document.getElementById("routeSearch");
    //Changes THE input into Upper Case (To handle Case sensitivity)
    const filter = input.value.toUpperCase();
    //Get All Routes And Store In Routes Vairable
    const routes = document.querySelectorAll(".route-card");

    //For Each Route Check If It Is Equal To Searched Word (Filter)
    routes.forEach(route => {
        //Gets Text Where It Is Available At (inner Text Or Text Content)
        const txtValue = route.textContent || route.innerText;

        //Changes Text to upper case and comapre it will filter (value >-1  means that comaprison is true)
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            route.style.display = "flex";  // show that route
        } 
        else 
        {
            route.style.display = "none";  // hide that route
        }
    });
}
