// initialize the elements that are going to contain the info from the API call
let coinName = document.createElement('p');
let coinPrice = document.createElement('p');
let coinVolume = document.createElement('p');
let supplyList = $('#supply_list');


let messariURL = 'https://data.messari.io/api/v2/assets?limit=20';

// var altMeURL = `https://api.alternative.me/v2/ticker/bitcoin/`;
let altMeURL = 'https://api.alternative.me/v2/ticker/bitcoin/';
let altMeAlsoURL = 'https://api.alternative.me/v2/listings/';

// get user form
var userCoinInputEl = $('#coin_input');
// hook into button it clicking when a keyup equals enter in the form field
var searchButton = $('.search-btn');

// event listeners for button click or search
searchButton.on("click", function () {
        // call coinSearch(userCoinInputEl.val());
        // console.log(userCoinInputEl.val())
        var test = userCoinInputEl.val();
        getMessariData(test);
    });

userCoinInputEl.keydown( e => {
    if (e.keyCode === 13) {
        e.preventDefault();
        var test = userCoinInputEl.val();
        getMessariData(test);
    } 
});    

var coinsDropdownContainer = document.querySelector('.past_search_container');

// add event listener to the dropdown list items themselves
coinsDropdownContainer.addEventListener("click", function(e) {
    // use event delegation to ensure clean event matches the link list items 
    if (e.target.matches('.dropdown-item')){
        console.log(e.target.dataset.coin);
        // storeCoinSearch(e.target.dataset.coin);
    }
});



function getMessariData(userEntry) {
    fetch(messariURL)
    .then( response => response.json())
    .then(listingsData => {
        
        console.log(listingsData.data);
        var fullData = listingsData.data;
        var index = getIndex(fullData, userEntry);
        console.log(index);
        
    });
}


function getIndex(blob, userInput) {
    var myIndex = blob.findIndex(function(blob) {
        return blob.slug == userInput;          
    });
    
    if (myIndex < 0) {
        myIndex = blob.findIndex(function(blob) {
        return blob.symbol == userInput;
        }); 
    }
    // use RegEx to ensure strings are happily formatted 
    // source: https://www.freecodecamp.org/news/how-to-capitalize-words-in-javascript/

    // ^ matches the beginning of the string.
    // \w matches any word character.
    // {1} takes only the first character.
    // Thus, ^\w{1} matches the first letter of the word.
    
    // | works like the boolean OR. It matches the expression after and before the |.
    // \s+ matches any amount of whitespace between the words (for example spaces, tabs, or line breaks).
    userInput = userInput.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
    if (myIndex < 0) {
        myIndex = blob.findIndex(function(blob) {
        return blob.name == userInput;
        }); 
    }
    return myIndex;
}


// call function that gets price/volume/coinname info
getCoinStats();

// define function that gets price/volume/coinname info
function getCoinStats() {
    
    fetch(altMeURL)
    .then(response => response.json())
    .then(myTickerData => {
        // extracts data of coin ID THEN you can ask for the subsequent properties
        coinName.textContent = myTickerData.data[1].name; 
        // coinPrice.textContent = myTickerData.data[1].quotes.USD.price
        // toLocaleString adds commas for readability 
        coinPrice.textContent = "$" + (myTickerData.data[1].quotes.USD.price).toLocaleString("en-US");
        coinVolume.textContent = "Volume traded in 24 hours: " + (myTickerData.data[1].quotes.USD.volume_24h).toLocaleString("en-US");
        // append basic stats to container first
        supplyList.append(coinName);
        supplyList.append(coinPrice);
        supplyList.append(coinVolume);
        // append circulation content to container second
        var coinCirc = $(`<li class="list-group-item d-flex justify-content-between align-items-center">Circulating supply:<span class="badge bg-primary rounded-pill">${(myTickerData.data[1].circulating_supply).toLocaleString("en-US")}</span></li>`);
        var coinTotal = $(`<li class="list-group-item d-flex justify-content-between align-items-center">Total supply:<span class="badge bg-primary rounded-pill">${(myTickerData.data[1].total_supply).toLocaleString("en-US")}</span></li>`);
        var coinMax = $(`<li class="list-group-item d-flex justify-content-between align-items-center">Max supply:<span class="badge bg-primary rounded-pill">${(myTickerData.data[1].max_supply).toLocaleString("en-US")}</span></li>`);
        supplyList.append(coinCirc);
        supplyList.append(coinTotal);
        supplyList.append(coinMax);
    });
}

// use jQuery 
var geckoList = $('.list-group-numbered');

getTrending();
// define function that gets coingecko trending data
function getTrending() {
    fetch(`https://api.coingecko.com/api/v3/search/trending`)
    .then(response => response.json())
    .then(myTrendingData => {
        var coinPopularLength = myTrendingData.coins.length;
        for (var i = 0; i < coinPopularLength; i++) {
            var coinPopularName = myTrendingData.coins[i].item.name;
            // Top-7 trending coins on CoinGecko as searched by users in the last 24 hours (Ordered by most popular first)
            // call on the top 7 coins from the coingecko top 7 list include name and image
            var coinPopularLi = $(`<li class="list-group-item d-flex justify-content-between align-items-start"><div class="ms-2 me-auto"><div class="fw-bold">Subheading</div>${coinPopularName}</div><img src="${myTrendingData.coins[i].item.small}"></li>`);
            // append element to list container
            geckoList.append(coinPopularLi);
        }

    });
}
