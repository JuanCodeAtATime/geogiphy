// PSEUDOCODE
// 1. Get API key from giphy.com
// 2. Capture User input 
// 3. Convert User inputs into values in order to specify
//    data type and quantity to retrieve from host (giphy.com)
// 4. Creat for loop that retrieves number of gifs requested by User
// 5.  Create Array of countries
// 6. Create code to dynamically generate HTML content
//7. Create variable that links default country buttons w/queryURL to retrieve content from host

// INITIALIZING VARIABLES
const apiKey = "&api_key=qFPDlYolJg3rML8RnElRJqnG83lhOD3T";
let trendingAPI = "http://api.giphy.com/v1/gifs/trending?api_key=" + apiKey;
let giphyURLBase = "http://api.giphy.com/v1/gifs/search";
let queryCountry = "";
let numOfGifs = "";
let inputCountry = "";

//These are the default countries displayed for User 
let displayCountries = ["Afghanistan", "Brazil", "Canada", "China",
    "Cuba", "Ethiopia", "Greece", "Guatemala", "Haiti", "India",
    "Israel", "Mexico", "United Kingdom", "United States"];

//Array of countries for Auto-complete feature to enhance UX
let country_list = ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Anguilla", "Antigua &amp; Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas"
    , "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia &amp; Herzegovina", "Botswana", "Brazil", "British Virgin Islands"
    , "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Cayman Islands", "Chad", "Chile", "China", "Colombia", "Congo", "Cook Islands", "Costa Rica"
    , "Cote D Ivoire", "Croatia", "Cruise Ship", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea"
    , "Estonia", "Ethiopia", "Falkland Islands", "Faroe Islands", "Fiji", "Finland", "France", "French Polynesia", "French West Indies", "Gabon", "Gambia", "Georgia", "Germany", "Ghana"
    , "Gibraltar", "Greece", "Greenland", "Grenada", "Guam", "Guatemala", "Guernsey", "Guinea", "Guinea Bissau", "Guyana", "Haiti", "Honduras", "Hong Kong", "Hungary", "Iceland", "India"
    , "Indonesia", "Iran", "Iraq", "Ireland", "Isle of Man", "Israel", "Italy", "Jamaica", "Japan", "Jersey", "Jordan", "Kazakhstan", "Kenya", "Kuwait", "Kyrgyz Republic", "Laos", "Latvia"
    , "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Mauritania"
    , "Mauritius", "Mexico", "Moldova", "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Namibia", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia"
    , "New Zealand", "Nicaragua", "Niger", "Nigeria", "Norway", "Oman", "Pakistan", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal"
    , "Puerto Rico", "Qatar", "Reunion", "Romania", "Russia", "Rwanda", "Saint Pierre &amp; Miquelon", "Samoa", "San Marino", "Satellite", "Saudi Arabia", "Senegal", "Serbia", "Seychelles"
    , "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "South Africa", "South Korea", "Spain", "Sri Lanka", "St Kitts &amp; Nevis", "St Lucia", "St Vincent", "St. Lucia", "Sudan"
    , "Suriname", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor L'Este", "Togo", "Tonga", "Trinidad &amp; Tobago", "Tunisia"
    , "Turkey", "Turkmenistan", "Turks &amp; Caicos", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "United States Minor Outlying Islands", "Uruguay"
    , "Uzbekistan", "Venezuela", "Vietnam", "Virgin Islands (US)", "Yemen", "Zambia", "Zimbabwe"];


// FUNCTIONS

function runQuery(queryURL) {

    queryURL = "http://api.giphy.com/v1/gifs/search?q=" + queryCountry + apiKey + "&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {

            for (let i = 0; i < 10; i++) {
                let imageUrl = response.data[0, i].images.original.url;
                console.log(imageUrl)


                // Creating and storing an image tag
                let countryGifs = $("<img>");

                // Setting the countryGifs src attribute to imageUrl

                countryGifs.attr("src", imageUrl);
                countryGifs.attr("alt", "country gifs");

                // Prepending the countryGifs to the images div
                $("#gifs").prepend(countryGifs);

            }

        });



}
// MAIN PROCESSES

//Upon clicking Search button, this function reads the User input value and 
//retrieves the data from the queryURL 

// Function for displaying the countries info
// Added a click event listener to all elements with the class "country"
// Added event listener to the document because it will work for dynamically generated elements
// $(".country").on("click") will only add listeners to elements that are on the page at that time

//Fun tion below intakes the button User pressed and retrieves data from host
//Created two additional variables.  The selectCountry variable for the input data
// and the buttonCountry variable which is the UI button User presses that also fethes
//data from host site.
function alertCountryName() {
    let selCountry = $(this).attr("data-name");
    let buttonCountry = "http://api.giphy.com/v1/gifs/search?q=" + selCountry + apiKey + "&limit=10";
    alert(buttonCountry);
}
// Function for displaying (country) buttons based on User's input
function renderButtons() {

    // Deleting the Countries prior to adding new countries

    $("#country-buttons").empty();

    // Looping through the countries list array
    for (let i = 0; i < displayCountries.length; i++) {

        // Here we dynamically generate buttons for each country in the array

        let a = $("<button>");
        // Adding a class of country to our button
        a.addClass("country");
        // Adding a data-attribute
        a.attr("data-name", displayCountries[i]);
        // Providing the initial button text
        a.text(displayCountries[i]);
        // Adding the button to the HTML
        $("#country-buttons").append(a);
    }
}

$("#searchBtn").on('click', function (event) {

    let tenGifs = "";
    //This prevents the buttons default behavior when clicked (which is submitting a form)
    event.preventDefault();
    //This line grabs the input from the textbox
    //Created additional variable (queryCountry) to capture the value or country the User types in.

    queryCountry = $("#country-input").val().trim();
    console.log(queryCountry + "....hi");
    queryURL = "http://api.giphy.com/v1/gifs/search?q=" + queryCountry + apiKey + "&limit=10";
    runQuery(tenGifs, queryURL)
    console.log(queryURL);
    // Adding the country from the textbox to our array
    displayCountries.push(queryCountry);
    // return false;

    renderButtons();

});


$(document).on("click", ".country", alertCountryName);

// Calling the renderButtons function to display the intial buttons
renderButtons();













