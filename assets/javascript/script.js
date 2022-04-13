// initialize the elements that are going to contain the info from the API call
var coinName = document.createElement('p');
var coinPrice = document.createElement('p');
var coinVolume = document.createElement('p');

// call function that gets price/volume/coinname info
getTicker();
// var number =

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
    });
}

document.body.appendChild(coinName);
document.body.appendChild(coinPrice);
document.body.appendChild(coinVolume);


// use jQuery 
var geckoList = $('.list-group-numbered');

getTrending();
// define function that gets coingecko trending data
function getTrending() {
    fetch(`https://api.coingecko.com/api/v3/search/trending`)
    .then(response => response.json())
    .then(myTrendingData => {

        // console.log(myTrendingData.coins[0].item.name);
        var coinPopularLength = myTrendingData.coins.length;
            console.log(coinPopularLength);
        for (var i = 0; i < coinPopularLength; i++) {
            var coinPopularName = myTrendingData.coins[i].item.name;
            console.log(coinPopularName);
            // Top-7 trending coins on CoinGecko as searched by users in the last 24 hours (Ordered by most popular first)
            // incorporate small img of coin next to name
            // var coinImageEl = $(`<img src="${myTrendingData.coins[i].item.small}">`);
            // call on the top 7 coins from the coingecko top 7 list
            // var coinPopularLi = $(`<li class="coinPopularListItemEl">${coinPopularName}</li>`);
            var coinPopularLi = $(`<li class="list-group-item d-flex justify-content-between align-items-start"><div class="ms-2 me-auto"><div class="fw-bold">Subheading</div>${coinPopularName}</div><img src="${myTrendingData.coins[i].item.small}"></li>`);
            // append elements to their appropriate parent tags
            // coinPopularLi.append(coinImageEl);
            geckoList.append(coinPopularLi);
        }

    });
}


// var coinSymbolKVP = [
//     {name:"Bitcoin", symbol: "BTC"},
//     {name:"Ethereum", symbol:  "ETH"},
//     {name:"Tether", symbol:  "USDT"},
//     {name:"ION", symbol:"ION"},
//     {name:"Binance Coin", symbol:  "BNB"	},
//     {name:"USD Coin", symbol:  "USDC"},
//     {name:"XRPV",symbol: "XRP"	},
//     {name:"Solana", symbol:  "SOL"	},
//     {name:"Cardano", symbol:  "ADA"},
//     {name:"Terra", symbol:  "LUNA"},
//     {name:"HEX", symbol:  "HEX"},
//     {name:"Avalanche", symbol:  "AVAX"	},
//     {name:"Dogecoin", symbol:  "DOGE"	},
//     {name:"Binance", symbol:  "BUSD"},	
//     {name:"Polkadot", symbol:  "DOT"},
//     {name:"Terra", symbol:  "UST"	},
//     {name:"SHIBA INU", symbol: "SHIB"},	
//     {name:"Wrapped", symbol:  "BiB"},
//     {name:"Polygon", symbol:  "MATIC"},	
//     {name:"Crypto.com coin", symbol:  "CRO"},
//     {name:"NEAR Protocol", symbol:  "NEAR"	},
//     {name:"Dai", symbol:"DAI"	},
//     {name:"Litecoin", symbol:  "LTC"},
//     {name:"Cosmos", symbol:  "ATOM"},
//     {name:"Chainlink", symbol:  "LINK"},	
//     {name:"Uniswap", symbol:  "UNI"} ];


