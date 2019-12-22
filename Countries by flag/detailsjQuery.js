var alphaCodeFromURL = new URLSearchParams(window.location.search);
alphaCodeFromURL = alphaCodeFromURL.get('AlphaCode');

fetch('https://restcountries.eu/rest/v2/alpha/' + alphaCodeFromURL)
    .then(res => {
        return res.json();
    })
    .then(data => initialize(data))

function initialize(data) {
    countriesInfo = data;
    $("#flag").attr({
        "src": countriesInfo.flag
    });
    $("#name").text(countriesInfo.name);
    $("#native-name").text(countriesInfo.nativeName);
    $("#alpha-code").text(countriesInfo.alpha3Code);
    $("#capital").text(countriesInfo.capital);
    $("#region").text(countriesInfo.region);
    $("#subregion").text(countriesInfo.subregion);
    $("#code").text(countriesInfo.numericCode);
    $("#population").text(countriesInfo.population);
    //borders array
    createBordersColumn();
    //Calling codes
    createCallingCodeColumn();
    //Currencies
    createCurrenciesColumn();
    //Languages
    createLanguagesColumn();
    //Lat-Lng
    $("#lat").text(countriesInfo.latlng[0]);
    $("#lng").text(countriesInfo.latlng[1]);
}

function createBordersColumn() {
    if(countriesInfo.borders.length == 0)
    $("#borders").text("No Borders");
    var bordersData = countriesInfo.borders.join(",");
    $("#borders").append(bordersData);
   
}

function createCallingCodeColumn() {
    var callingCodesData = countriesInfo.callingCodes.join(",");
    $("#calling-codes").append(callingCodesData);

}

function createCurrenciesColumn() {
    var currencyLength = countriesInfo.currencies.length;
    for (var i = 0; i < currencyLength; i++) {
        var keys = Object.keys(countriesInfo.currencies[i]);
        currencyData = '';
        keys.forEach(key => {
            currencyData += '<br>' + key + ': ' + countriesInfo.currencies[i][key];
        });
        $("#currencies").append(currencyData);
    }
}

function createLanguagesColumn() {
    var langLength = countriesInfo.languages.length;
    for (var i = 0; i < langLength; i++) {
        //console.log(Object.keys(countriesInfo.languages[i]));
        var liListItem1 = $("<li>-Name: " + countriesInfo.languages[i].name+"</li>");
        var liListItem2 = $("<li>Native Name: " + countriesInfo.languages[i].nativeName+"</li>");
        $("#lang").append($("<ul></ul>").append(liListItem1, liListItem2));
    }
}