// initialize the elements that are going to contain the info from the API call
var coinName = document.createElement('p');
var coinPrice = document.createElement('p');
var coinVolume = document.createElement('p');
var coinCirc = document.createElement('p');
var coinTotal = document.createElement('p');
var coinMax = document.createElement('p');

// call function that gets price/volume/coinname info
getTicker();

// define function that gets price/volume/coinname info
function getTicker() {
    fetch(`https://api.alternative.me/v2/ticker/bitcoin/`)
    .then(response => response.json())
    .then(myTickerData => {
        // extracts data of coin ID THEN you can ask for the subsequent properties
        // NEXT STEP get whatever is searched or dropped down is the coin
        coinName.textContent = myTickerData.data[1].name; 
        // coinPrice.textContent = myTickerData.data[1].quotes.USD.price
        // toLocaleString adds commas for readability 
        coinPrice.textContent = "$" + (myTickerData.data[1].quotes.USD.price).toLocaleString("en-US");
        // console.log(myTickerData.data[1].quotes.USD.volume_24h);
        coinVolume.textContent = "Volume traded in 24 hours: " + (myTickerData.data[1].quotes.USD.volume_24h).toLocaleString("en-US");
        coinCirc.textContent = "Circulating supply: " + (myTickerData.data[1].circulating_supply).toLocaleString("en-US"); 
        // coinPrice.textContent = myTickerData.data[1].quotes.USD.price
        // toLocaleString adds commas for readability 
        coinTotal.textContent = "Total supply: " + (myTickerData.data[1].total_supply).toLocaleString("en-US");
        // console.log(myTickerData.data[1].quotes.USD.volume_24h);
        coinMax.textContent = "Max supply: " + (myTickerData.data[1].max_supply).toLocaleString("en-US");
    });
}

document.body.appendChild(coinName);
document.body.appendChild(coinPrice);
document.body.appendChild(coinVolume);
document.body.appendChild(coinCirc);
document.body.appendChild(coinTotal);
document.body.appendChild(coinMax);

// use jQuery 
var geckoList = $('.list-group-numbered');

getTrending();
// define function that gets coingecko trending data
function getTrending() {
    fetch(`https://api.coingecko.com/api/v3/search/trending`)
    .then(response => response.json())
    .then(myTrendingData => {
        var coinPopularLength = myTrendingData.coins.length;
            console.log(coinPopularLength);
        for (var i = 0; i < coinPopularLength; i++) {
            var coinPopularName = myTrendingData.coins[i].item.name;
            console.log(coinPopularName);
            // Top-7 trending coins on CoinGecko as searched by users in the last 24 hours (Ordered by most popular first)
            // call on the top 7 coins from the coingecko top 7 list include name and image
            var coinPopularLi = $(`<li class="list-group-item d-flex justify-content-between align-items-start"><div class="ms-2 me-auto"><div class="fw-bold">Subheading</div>${coinPopularName}</div><img src="${myTrendingData.coins[i].item.small}"></li>`);
            // append element to list container
            geckoList.append(coinPopularLi);
        }

    });
}
