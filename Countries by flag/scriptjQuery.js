window.addEventListener("load", function () {
    var loader = document.querySelector('.loader');
    loader.className += " fade";
});
var countriesFlags;
fetch("https://restcountries.eu/rest/v2/all?fields=flag;name;numericCode;capital;region;alpha3Code")
    .then(res => {
        return res.json();
    })
    .then(data => initialize(data))
    .catch(error => alert("Error" + error));

function initialize(data) {
    countriesFlags = data;
    var classRow = "row mr-0  style-row",
        classColumn = "col pt-5 pl-4",
        classCard = "card style-card card-background";
    var lenOfCountries = countriesFlags.length;
    var divMain = $("<div> </div>").addClass(classRow);
    for (var i = 0; i < lenOfCountries; i++) {
        //overlay
        var overlay = document.createElement('div');
        createOverlay(overlay, i);
        
        // Card creation + attrivutes
        var cardDiv = $("<div></div>").addClass(classCard).attr({
            "style": "background-image: url(" + countriesFlags[i].flag + ")"
        }).append(overlay);
        
        // column creation + adding attributes
        var columnDiv = $("<div></div>").addClass(classColumn).append(cardDiv);

        $(divMain).append(columnDiv);
    }
    $("body").append(divMain);
}

function createOverlay(overlay, i) {
    //Header of overlay with country name
    var nameTitle = $("<h3>"+countriesFlags[i].name+"</h3>");
    //Brief imformation on overlay card
    var briefInfo = $("<p> Code: " + countriesFlags[i].numericCode + "<br> Capital: " + countriesFlags[i].capital + "<br> Region: " + countriesFlags[i].region+"</p>");

    var aLink = $("<a href= countries-details.html?AlphaCode=" + countriesFlags[i].alpha3Code+">More Details</a>");

    //Button Details and attributes
    var moreDetailsButton = $("<button></button>").append(aLink).addClass( "btn btn-secondary");
    $(overlay).addClass("overlay").append(nameTitle, briefInfo, moreDetailsButton);
}