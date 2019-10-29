// PSEUDOCODE
// 1. Get API key from giphy.com
// 2. Capture User input 
// 3. Convert User inputs into values in order to specify
//    country type and quantity to retrieve from host (giphy.com)
// 4. Creat for loop that retrieves all 10 requested gifs requested of host site (Giphy.com)
// 5.  Create Array of countries
// 6. Create code to dynamically generate HTML content
//7. Create variable that links default country buttons w/queryURL to retrieve content from host

// INITIALIZING VARIABLES
const apiKey = "&api_key=qFPDlYolJg3rML8RnElRJqnG83lhOD3T";
const apiLimitTen = "&api_key=qFPDlYolJg3rML8RnElRJqnG83lhOD3T&limit=10";
let giphyURLBase = "https://api.giphy.com/v1/gifs/search";
let queryCountry = "";
let selCountry = "";
let buttonCountry = "https://api.giphy.com/v1/gifs/search?q=" + selCountry + apiLimitTen;

//These are the default country buttons displayed for User 
let displayCountries = ["Afghanistan", "Brazil", "Canada", "China",
    "Cuba", "Guatemala", "Haiti", "India",
    "Israel", "Mexico", "United States"];

// FUNCTIONS
//Arguments in function below include queryURL and "search" variable which
// is the country button pressed by User 
function runQuery(queryURL, search) {

    queryURL = "https://api.giphy.com/v1/gifs/search?q=" + search + apiLimitTen;

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .done(function (response) {

            for (let i = 0; i < response.data.length; i++) {
                let imageUrl = response.data[0, i].images.original.url;
                let stillImageUrl = response.data[0, i].images.original_still.url;

                // Creating and storing an image tag
                let countryGifs = $("<img>");
                //Created attributes containing src properties for both still and animated gifs
                countryGifs.attr({
                    "src": stillImageUrl,
                    "data-still": stillImageUrl,
                    "data-animate": imageUrl,
                    "data-state": "still",
                    "class": "gifs"
                });


                // Creating a paragraph tag with the result item's rating
                let p = $("<p>").text("Rating: " + response.data[0, i].rating);

                // Prepending the countryGifs to the images div
                let gifsDiv = $("#gifsHere").prepend(countryGifs);

                //Prepending the Ratings paragraph element to the gifsDiv
                gifsDiv.prepend(p);

            }

            $(".gifs").on("click", function () {
                let state = $(this).attr("data-state");
                // $(this).attr("data-state") will either be "still" or "animate"
                // If it's still: User can animate on click
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


        });

}


// Function for displaying (country) buttons based on User's input
function renderButtons() {

    // Deleting the Countries prior to adding new countries

    $("#country-buttons").empty();

    // Looping through the countries list array
    for (let i = 0; i < displayCountries.length; i++) {

        // Dynamically generating buttons for each country in the array

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

    //selCountry variable is for the country buttons
    selCountry = $(this).attr("data-name");
    queryCountry = $("#country-input").val().trim();

    //This runQuery function called here runs the query the User types in.  Without this
    //call, the User input creates a button, but doesn't fetch the data from the host site.
    runQuery("", queryCountry);

    //This prevents the buttons default behavior when clicked (which is submitting a form)
    event.preventDefault();

    // Adding the country from the text input box to our (buttons) array
    displayCountries.push(queryCountry);

    renderButtons();

});

$(document).on("click", ".country", function () {

    let selCountry = $(this).attr("data-name");
    runQuery("", selCountry)

});

// Calling the renderButtons function to display the intial buttons
renderButtons();

//I included (but did not activate) an array containing all countries.  The original plan
//was to have an auto-complete feature containing a drop-down of all the countries in this array. 
//I aborted that goal as it exceeded MVP expectations.  However, the variable still exists
//herein incase I want to add that feature in the future.

// let countryList = ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Anguilla", "Antigua &amp; Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas"
//     , "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia &amp; Herzegovina", "Botswana", "Brazil", "British Virgin Islands"
//     , "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Cayman Islands", "Chad", "Chile", "China", "Colombia", "Congo", "Cook Islands", "Costa Rica"
//     , "Cote D Ivoire", "Croatia", "Cruise Ship", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea"
//     , "Estonia", "Ethiopia", "Falkland Islands", "Faroe Islands", "Fiji", "Finland", "France", "French Polynesia", "French West Indies", "Gabon", "Gambia", "Georgia", "Germany", "Ghana"
//     , "Gibraltar", "Greece", "Greenland", "Grenada", "Guam", "Guatemala", "Guernsey", "Guinea", "Guinea Bissau", "Guyana", "Haiti", "Honduras", "Hong Kong", "Hungary", "Iceland", "India"
//     , "Indonesia", "Iran", "Iraq", "Ireland", "Isle of Man", "Israel", "Italy", "Jamaica", "Japan", "Jersey", "Jordan", "Kazakhstan", "Kenya", "Kuwait", "Kyrgyz Republic", "Laos", "Latvia"
//     , "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Mauritania"
//     , "Mauritius", "Mexico", "Moldova", "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Namibia", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia"
//     , "New Zealand", "Nicaragua", "Niger", "Nigeria", "Norway", "Oman", "Pakistan", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal"
//     , "Puerto Rico", "Qatar", "Reunion", "Romania", "Russia", "Rwanda", "Saint Pierre &amp; Miquelon", "Samoa", "San Marino", "Satellite", "Saudi Arabia", "Senegal", "Serbia", "Seychelles"
//     , "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "South Africa", "South Korea", "Spain", "Sri Lanka", "St Kitts &amp; Nevis", "St Lucia", "St Vincent", "St. Lucia", "Sudan"
//     , "Suriname", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor L'Este", "Togo", "Tonga", "Trinidad &amp; Tobago", "Tunisia"
//     , "Turkey", "Turkmenistan", "Turks &amp; Caicos", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "United States Minor Outlying Islands", "Uruguay"
//     , "Uzbekistan", "Venezuela", "Vietnam", "Virgin Islands (US)", "Yemen", "Zambia", "Zimbabwe"];













