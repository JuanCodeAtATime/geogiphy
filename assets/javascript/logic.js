// PSEUDOCODE
// 1. Get API key from giphy.com
// 2. Capture User input 
// 3. Convert User inputs into values in order to specify
//    data type and quantity to retrieve from host (giphy.com)
// 4. Creat for loop that retrieves number of gifs requested by User
// 5.  Create Array of countries
// 6. Create code to dynamically generate HTML content

// VARIABLES
const apiKey = "&api_key=qFPDlYolJg3rML8RnElRJqnG83lhOD3T";
let trendingAPI = "http://api.giphy.com/v1/gifs/trending?api_key=" + apiKey;
let giphyURLBase = "http://api.giphy.com/v1/gifs/search";
let queryCountry = "";
let numOfGifs = "";


// FUNCTIONS

function runQuery(numOfGifs, queryURL) {

    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function (giphyData) {

    })

    console.log()


}


// MAIN PROCESSES

//Upon clicking Search button, this function reads the User input value and 
//retrieves the data from the queryURL 
$("#searchBtn").on('click', function () {

    queryCountry = $("#search").val().trim();
    console.log(queryCountry);
    queryURL = "http://api.giphy.com/v1/gifs/search?q=" + queryCountry + apiKey;
    runQuery(10, "https://api.giphy.com/v1/gifs/trending?api_key=qFPDlYolJg3rML8RnElRJqnG83lhOD3T")
    console.log(queryURL);
    return false;


})









