// initialize the elements that are going to contain the info from the API call
let coinName = document.createElement('p');
let supplyList = $('#supply_list');
let redditList = $('#reddit');


let messariURL = 'https://data.messari.io/api/v2/assets?limit=500';

// let altMeURL = 'https://api.alternative.me/v2/ticker/?limit=3000/';
// // let altMeAlsoURL = 'https://api.alternative.me/v2/listings/';

// get user form
var userCoinInputEl = $('#coin_input');
// hook into button it clicking when a keyup equals enter in the form field
var searchButton = $('.search-btn');

// event listeners for button click or search
searchButton.on("click", function () {
        clearOldSearches();
        getMessariData(userCoinInputEl.val());
    });

userCoinInputEl.keydown( e => {
    if (e.keyCode === 13) {
        e.preventDefault();
        // var test = userCoinInputEl.val();
        clearOldSearches();
        getMessariData(userCoinInputEl.val());
    } 
});    


var coinsDropdownContainer = document.querySelector('#past_search_container');

// add event listener to the dropdown list items themselves
coinsDropdownContainer.addEventListener("click", function(e) {
    // use event delegation to ensure clean event matches the link list items 
    if (e.target.matches('.dropdown-item')){
        clearOldSearches();
        userCoinInputEl.val(e.target.dataset.coin);
        getMessariData(userCoinInputEl.val());
    }
});

// clears old elements when a new search is conducted so that the list can be re-rendered cleanly
function clearOldSearches() {
    $('.searched-list-group-item').remove();
}

var index = -1;



function getMessariData(userEntry) {
    fetch(messariURL)
    .then( response => response.json())
    .then(listingsData => {
        
        var messariBlobFull = listingsData.data;
        index = getCoinIndexInBlob(messariBlobFull, userEntry);
        if (index < 0) {
            alert("Coin not found please check your spelling or try searching for a different coin.");
            return;
        }
        console.log(listingsData.data[index])
        coinName.textContent = listingsData.data[index].name; 
        
        supplyList.append(coinName);
        
        var coinActivAdds = $(`<li class="list-group-item searched-list-group-item d-flex justify-content-between align-items-center">Active address:<span class="badge bg-primary rounded-pill">${(messariBlobFull[index].metrics.blockchain_stats_24_hours.count_of_active_addresses).toLocaleString("en-US")}</span></li>`);
        var coinTxnVol = $(`<li class="list-group-item searched-list-group-item d-flex justify-content-between align-items-center">Total Transactions in Past 24 hours:<span class="badge bg-primary rounded-pill">${(messariBlobFull[index].metrics.blockchain_stats_24_hours.transaction_volume).toLocaleString("en-US")}</span></li>`);
        var coinCirc = $(`<li class="list-group-item searched-list-group-item d-flex justify-content-between align-items-center">Total Circulation:<span class="badge bg-primary rounded-pill">${(messariBlobFull[index].metrics.supply.circulating).toLocaleString("en-US")}</span></li>`);
        var coinOutstd = $(`<li class="list-group-item searched-list-group-item d-flex justify-content-between align-items-center">Outstanding coins:<span class="badge bg-primary rounded-pill">${(messariBlobFull[index].metrics.supply_activity.outstanding).toLocaleString("en-US")}</span></li>`);
        var coinSpplActiv1yPercent = $(`<li class="list-group-item searched-list-group-item d-flex justify-content-between align-items-center">Percent  Supply Activity in Past Year:<span class="badge bg-primary rounded-pill">${messariBlobFull[index].metrics.supply_activity._1y_percent}%</span></li>`);
        supplyList.append(coinActivAdds);
        supplyList.append(coinTxnVol);
        supplyList.append(coinCirc);
        supplyList.append(coinOutstd);
        supplyList.append(coinSpplActiv1yPercent);
        
        var coinRedditActive = $(`<li class="list-group-item searched-list-group-item d-flex justify-content-between align-items-center">Reddit Users Active:<span class="badge bg-primary rounded-pill">${(messariBlobFull[index].metrics.reddit.active_user_count).toLocaleString("en-US")}</span></li>`);
        var coinRedditSubscribed = $(`<li class="list-group-item searched-list-group-item d-flex justify-content-between align-items-center">Reddit Users Subscribed:<span class="badge bg-primary rounded-pill">${(messariBlobFull[index].metrics.reddit.subscribers).toLocaleString("en-US")}</span></li>`);

        redditList.append(coinRedditActive);
        redditList.append(coinRedditSubscribed);

        
    });
}


function getCoinIndexInBlob(blob, userInput) {
    var myIndex = -1;
    console.log(blob);
    if (blob[1] && blob[1].slug) {
        myIndex = blob.findIndex(function(blob) {
            return blob.slug == userInput;          
        });
    } 
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
