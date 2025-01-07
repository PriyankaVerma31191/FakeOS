let taskbar = document.getElementsByClassName("taskbar")[0]
let startmenu = document.getElementsByClassName("startmenu")[0]

taskbar.addEventListener("click", ()=>{
    console.log("clicked");
    if(startmenu.style.bottom == "50px"){
        startmenu.style.bottom = "-655px"
    }
    else{
        startmenu.style.bottom = "50px"
    }
})
function updateDateTime() {
    const dateTimeElement = document.getElementById("dateTime");
    const now = new Date();
    
    // Format the time and date
    const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    const formattedDateTime = now.toLocaleString('en-US', options);

    // Update the content
    dateTimeElement.textContent = formattedDateTime;
}

// Update every second
setInterval(updateDateTime, 1000);

// Initial call to display immediately
updateDateTime();