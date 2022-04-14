// initialize the elements that are going to contain the info from the API call
let coinName = document.createElement('p');
let topLevelList = $('#day_list');
let holderLevelList = $('#holder_list');
let redditList = $('#reddit');

// get user form
var userCoinInputEl = $('#coin_input');
userCoinInputEl.val("Enter coin here");
// hook into button it clicking when a keyup equals enter in the form field
var searchButton = $('.search-btn');

// event listeners for button click or search
searchButton.on("click", function () {
        clearOldSearches();
        getMessariProto(userCoinInputEl.val());
    });

userCoinInputEl.keydown( e => {
    if (e.keyCode === 13) {
        e.preventDefault();
        // var test = userCoinInputEl.val();
        clearOldSearches();
        getMessariProto(userCoinInputEl.val());
    } 
});    


var coinsDropdownContainer = document.querySelector('#past_search_container');

// add event listener to the dropdown list items themselves
coinsDropdownContainer.addEventListener("click", function(e) {
    // use event delegation to ensure clean event matches the link list items 
    if (e.target.matches('.dropdown-item')){
        clearOldSearches();
        userCoinInputEl.val(e.target.dataset.coin);
        getMessariProto(userCoinInputEl.val());
    }
});

// var coinNotFoundModal = new bootstrap.Modal(document.getElementById('coinNotFoundModal'), options)

function getMessariProto(userEntry) {
    userEntry = userEntry.toLowerCase();

    let messariURL = `https://data.messari.io/api/v1/assets/${userEntry}/metrics`

    fetch(messariURL)
    .then( function(response) {
        if (response.status !== 200) {
            userCoinInputEl.val("Display error");
        }
    return response.json();
    })
    .then(messariData => {
        console.log(messariData);
        if (messariData.status.error_code === 404) {
            userCoinInputEl.val("Coin not recognized");
        }
        // all time high price
        if (messariData.data.market_data.price_usd) {
            var coinCurrentPrice = $(`<li class="list-group-item searched-list-group-item d-flex justify-content-between align-items-center">Current price (USD): <span class="badge bg-primary rounded-pill">$ ${(messariData.data.market_data.price_usd).toLocaleString("en-US")}</span></li>`);
            topLevelList.append(coinCurrentPrice);            
        }
        else {
            var coinHighPrice = $(`<li class="list-group-item searched-list-group-item d-flex justify-content-between align-items-center">No data available for current price</li>`);
            topLevelList.append(coinHighPrice);
        }
        
        // active addresses/active traders
        if (messariData.data.blockchain_stats_24_hours.count_of_active_addresses) {
            var coinTradersDaily = $(`<li class="list-group-item searched-list-group-item d-flex justify-content-between align-items-center">Number of traders in past day: <span class="badge bg-primary rounded-pill">${(messariData.data.blockchain_stats_24_hours.count_of_active_addresses).toLocaleString("en-US")}</span></li>`);
            topLevelList.append(coinTradersDaily);
        }
        else {
            var coinTradersDaily = $(`<li class="list-group-item searched-list-group-item d-flex justify-content-between align-items-center">No data available for number of traders</li>`);
            topLevelList.append(coinTradersDaily);
        }
        // active trades past 24 hours
        if (messariData.data.blockchain_stats_24_hours.transaction_volume) {
            var coinTradesDaily = $(`<li class="list-group-item searched-list-group-item d-flex justify-content-between align-items-center">Number of trades in past day: <span class="badge bg-primary rounded-pill">${(messariData.data.blockchain_stats_24_hours.transaction_volume).toLocaleString("en-US")}</span></li>`);
            topLevelList.append(coinTradesDaily);
        }
        else {
            var coinTradesDaily = $(`<li class="list-group-item searched-list-group-item d-flex justify-content-between align-items-center">No data available for trading activity</li>`);
            topLevelList.append(coinTradesDaily);
        }
        // percent change last 24 hours
        if (messariData.data.market_data.percent_change_usd_last_24_hours) {
            if (messariData.data.market_data.percent_change_usd_last_24_hours > 0) {
                var coinPriceDailyChange = $(`<li class="list-group-item searched-list-group-item d-flex justify-content-between align-items-center">Price changes past 24 hours: <span class="badge bg-success rounded-pill">${(messariData.data.market_data.percent_change_usd_last_24_hours).toLocaleString("en-US")}</span></li>`);
                topLevelList.append(coinPriceDailyChange);
            }
            else {
                var coinPriceDailyChange = $(`<li class="list-group-item searched-list-group-item d-flex justify-content-between align-items-center">Price changes past 24 hours: <span class="badge bg-danger rounded-pill">${(messariData.data.market_data.percent_change_usd_last_24_hours).toLocaleString("en-US")}</span></li>`);
                topLevelList.append(coinPriceDailyChange);
            }
        }
        else {
            var coinPriceDailyChange = $(`<li class="list-group-item searched-list-group-item d-flex justify-content-between align-items-center">No data available for price change activity</li>`);
            topLevelList.append(coinPriceDailyChange);
        }
        


        // percent chage last year trades past 24 hours
        if (messariData.data.roi_data.percent_change_last_1_year) {
            if (messariData.data.market_data.percent_change_usd_last_24_hours > 0) {
                var coinChangeAnnual = $(`<li class="list-group-item searched-list-group-item d-flex justify-content-between align-items-center">Percent change over this past year <span class="badge bg-success rounded-pill">${(messariData.data.roi_data.percent_change_last_1_year).toLocaleString("en-US")}</span></li>`);
                holderLevelList.append(coinChangeAnnual);
            }
            else {
                var coinChangeAnnual = $(`<li class="list-group-item searched-list-group-item d-flex justify-content-between align-items-center">Percent change over this past year <span class="badge bg-danger rounded-pill">${(messariData.data.roi_data.percent_change_last_1_year).toLocaleString("en-US")}</span></li>`);
                holderLevelList.append(coinChangeAnnual);
            }
        }
        else {
            var coinChangeAnnual = $(`<li class="list-group-item searched-list-group-item d-flex justify-content-between align-items-center">No data available for the past year</li>`);
            holderLevelList.append(coinChangeAnnual);
        }

        // all time high price date
        if (messariData.data.all_time_high.at ) {
            var coinHighDate = $(`<li class="list-group-item searched-list-group-item d-flex justify-content-between align-items-center">All time high date<span class="badge bg-primary rounded-pill">${dayjs(messariData.data.all_time_high.at).format('MM/DD/YYYY')}</span></li>`);
            holderLevelList.append(coinHighDate);
        }
        else {
            var coinTradesDaily = $(`<li class="list-group-item searched-list-group-item d-flex justify-content-between align-items-center">No data available for all time high price dage</li>`);
            holderLevelList.append(coinTradesDaily);
        }
        // all time high price
        if (messariData.data.all_time_high.price) {
            var coinHighPrice = $(`<li class="list-group-item searched-list-group-item d-flex justify-content-between align-items-center">Price all time high (USD): <span class="badge bg-success rounded-pill">$ ${(messariData.data.all_time_high.price).toLocaleString("en-US")}</span></li>`);
            holderLevelList.append(coinHighPrice);            
        }
        else {
            var coinHighPrice = $(`<li class="list-group-item searched-list-group-item d-flex justify-content-between align-items-center">No data available for price change activity</li>`);
            holderLevelList.append(coinHighPrice);
        }

        // reddit active user count
        if (messariData.data.reddit.active_user_count) {
            var coinRedditActive = $(`<li class="list-group-item searched-list-group-item d-flex justify-content-between align-items-center">Reddit Users Active:<span class="badge bg-primary rounded-pill">${(messariData.data.reddit.active_user_count).toLocaleString("en-US")}</span></li>`);
            redditList.append(coinRedditActive);
        }
        else {
            var coinRedditActive = $(`<li class="list-group-item searched-list-group-item d-flex justify-content-between align-items-center">No data available for reddit activity</li>`);
            redditList.append(coinRedditActive);
        }
        if (messariData.data.reddit.subscribers) {
            var coinRedditSubscribed = $(`<li class="list-group-item searched-list-group-item d-flex justify-content-between align-items-center">Reddit Users Subscribed:<span class="badge bg-primary rounded-pill">${(messariData.data.reddit.subscribers).toLocaleString("en-US")}</span></li>`);
            redditList.append(coinRedditSubscribed);
        }
        else {
            var coinRedditSubscribed = $(`<li class="list-group-item searched-list-group-item d-flex justify-content-between align-items-center">No data available for reddit community</li>`);
            redditList.append(coinRedditSubscribed);
        }
        

    });
}



// clears old elements when a new search is conducted so that the list can be re-rendered cleanly
function clearOldSearches() {
    $('.searched-list-group-item').remove();
}

// use jQuery 
var geckoList = $('.list-group-numbered');

getTrending();
// define function that gets coingecko trending data
function getTrending() {
    fetch(`https://api.coingecko.com/api/v3/search/trending`)
    .then( function(response) {
        if (response.status !== 200) {
            userCoinInputEl.val("Display error");
        }
    return response.json();
    })
    .then(myTrendingData => {
        var coinPopularLength = myTrendingData.coins.length;
        for (var i = 0; i < coinPopularLength; i++) {
            var coinPopularName = myTrendingData.coins[i].item.name;
            var coinPopularTicker = myTrendingData.coins[i].item.symbol;
            // Top-7 trending coins on CoinGecko as searched by users in the last 24 hours (Ordered by most popular first)
            // call on the top 7 coins from the coingecko top 7 list include name and image
            var coinPopularLi = $(`<li class="list-group-item d-flex justify-content-between align-items-start"><div class="ms-2 me-auto"><div class="fw-bold">${coinPopularName}</div>${coinPopularTicker}</div><img src="${myTrendingData.coins[i].item.small}"></li>`);
            // append element to list container
            geckoList.append(coinPopularLi);
        }

    });
}
