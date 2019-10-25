// PSEUDOCODE
// 1. Get API key from giphy.com
// 2. Capture User input 
// 3. Convert User inputs into values in order to specify
//    data type and quantity to retrieve from host (giphy.com)
// 4. Creat for loop that retrieves all 10 requested gifs requested of host site (Giphy.com)
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
let selCountry = "";
let buttonCountry = "http://api.giphy.com/v1/gifs/search?q=" + selCountry + apiKey + "&limit=10";

//These are the default countries displayed for User 
let displayCountries = ["Afghanistan", "Brazil", "Canada", "China",
    "Cuba", "Guatemala", "Haiti", "India",
    "Israel", "Mexico", "United States"];

// //This same variable below deafults to no countries in the display panel.  
// let displayCountries = [];

//Array of countries for Auto-complete feature to enhance UX
let countryList = ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Anguilla", "Antigua &amp; Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas"
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

    queryCountry = $("#country-input").val().trim();
    queryURL = "http://api.giphy.com/v1/gifs/search?q=" + queryCountry + apiKey + "&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {
            // add error handling here
            // if the user enters bad data, what does the response object look like?
            // How can we differentiate between good and bad response?
            // What do we want to do when we get a good response?  A bad response?
            for (let i = 0; i < 100; i++) {
                let imageUrl = response.data[0, i].images.original.url;
                let stillImageUrl = response.data[0, i].images.original_still.url;

                // Creating and storing an image tag
                let countryGifs = $("<img>");

                countryGifs.attr({
                    "src": stillImageUrl,
                    "data-still": stillImageUrl,
                    "data-animate": imageUrl,
                    "data-state": "still",
                    "class": "gifs"
                });


                // Prepending the countryGifs to the images div
                $(".gifs").prepend(countryGifs);

                $(".gifs").on("click", function () {
                    let state = $(this).attr("data-state");
                    // $(this).attr("data-state") will either be "still" or "animate"
                    // IF it's still: we change it to animate
                    if (state === "still") {

                        let newSrc = $(this).attr("data-animate");
                        $(this).attr("src", newSrc);
                        $(this).attr("data-state", "animate");

                        // OTHERWISE it's animate already, so we change it to still
                    } else {
                        let newSrc = $(this).attr("data-still");
                        $(this).attr("src", newSrc);
                        $(this).attr("data-state", "still");
                    }
                });
            }

        });

}

// AJAX call for queryURL2 is here.  Needed additional call for User buttons. 

function runQuery2(queryURL2) {
    selCountry = $(this).attr("data-name");
    queryURL2 = "http://api.giphy.com/v1/gifs/search?q=" + selCountry + apiKey + "&limit=10";
    alert(queryURL2);

    $.ajax({
        url: queryURL2,
        method: "GET"
    })
        .then(function (response) {
            // add error handling here
            // if the user enters bad data, what does the response object look like?
            // How can we differentiate between good and bad response?
            // What do we want to do when we get a good response?  A bad response?
            for (let i = 0; i < 100; i++) {
                let imageUrl = response.data[0, i].images.original.url;
                let stillImageUrl = response.data[0, i].images.original_still.url;

                // Creating and storing an image tag
                let countryGifs = $("<img>");

                countryGifs.attr({
                    "src": stillImageUrl,
                    "data-still": stillImageUrl,
                    "data-animate": imageUrl,
                    "data-state": "still",
                    "class": "gifs"
                });


                // Prepending the countryGifs to the images div
                $(".gifs").prepend(countryGifs);

                $(".gifs").on("click", function () {
                    let state = $(this).attr("data-state");
                    // $(this).attr("data-state") will either be "still" or "animate"
                    // IF it's still: we change it to animate
                    if (state === "still") {

                        let newSrc = $(this).attr("data-animate");
                        $(this).attr("src", newSrc);
                        $(this).attr("data-state", "animate");

                        // OTHERWISE it's animate already, so we change it to still
                    } else {
                        let newSrc = $(this).attr("data-still");
                        $(this).attr("src", newSrc);
                        $(this).attr("data-state", "still");
                    }
                });
            }

        });

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
    selCountry = $(this).attr("data-name");
    //This prevents the buttons default behavior when clicked (which is submitting a form)
    event.preventDefault();


    //Created additional variable (queryCountry) which is the value captured
    //when the User types in the search field.
    queryCountry = $("#country-input").val().trim();

    //The User input value (queryCountry) is then concatenated with the API key below to create the queryURL
    queryURL = "http://api.giphy.com/v1/gifs/search?q=" + queryCountry + apiKey + "&limit=10";

    runQuery(tenGifs, queryURL)

    //The country buttons variable (selCountry) is also concatenated with the API key below to create the queryURL2
    queryURL2 = "http://api.giphy.com/v1/gifs/search?q=" + selCountry + apiKey + "&limit=10";

    // Adding the country from the textbox to our (buttons) array
    displayCountries.push(queryCountry);
    // return false;

    renderButtons();

});


$(document).on("click", ".country", runQuery2);

// Calling the renderButtons function to display the intial buttons
renderButtons();













