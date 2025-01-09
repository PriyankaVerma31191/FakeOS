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

const icons= document.getElementById('worldicon');
const modal = document.getElementById('openModal');
icons.addEventListener("click", openModal);
const button = document.getElementById("closeModal");
const form = document.getElementById("inquiryForm");
const countryInput = document.getElementById("country");
const countryName = document.getElementById("countryName");
const countryRegion = document.getElementById("countryRegion");
const countryCapital = document.getElementById("countryCapital");
const countryDataDiv = document.getElementById("countryData");

const resetModal = () => {
    inquiryForm.reset(); // Reset the form fields
    countryDataDiv.textContent = ""; // Clear the displayed country data
};

function openModal(){
modal.showModal();
}
button.addEventListener("click", modalClose);
function modalClose(){
    modal.close();
    resetModal();

}
const fetchCountryData = async(name) => {
    try{
        const response =  await fetch(`https://restcountries.com/v3.1/name/${name}`)
        if(!response.ok){
            throw new Error ("Could not get Data");
            
        } 
        const data = await response.json();
        // console.log(data);
        const officialName = data[0].name.official;
        const region = data[0].region;
        const capital = data[0].capital[0];
        // console.log(officialName)
        // console.log(region);
        // console.log(capital);
        const cleanedObj ={ name: officialName, region: region, capital: capital};
        return cleanedObj;
    }catch(error) {
        throw error;
    }
}
fetchCountryData("Australia");
form.addEventListener("submit" ,async (event)=> {
    event.preventDefault();
    const country = countryInput.value;

    // const countryData = await fetchCountryData(country)
    // console.log(countryData);
    if (country === "") {
        countryName.textContent = "Please enter a valid country name.";
        countryRegion.textContent = "";
        countryCapital.textContent = "";
        return;
    }
    try {
        const countryData = await fetchCountryData(country);
        countryName.textContent = `Official Name: ${countryData.name}`;
        countryRegion.textContent = `Region: ${countryData.region}`;
        countryCapital.textContent = `Capital: ${countryData.capital}`;
    } catch (error) {
        countryName.textContent = error.message;
        countryRegion.textContent = "";
        countryCapital.textContent = "";
    }

})

