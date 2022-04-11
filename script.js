var coinName = document.createElement('p');
var coinPrice = document.createElement('p');
var coinVolume = document.createElement('p');

getTicker();
// var number =

function getTicker() {
    fetch(`https://api.alternative.me/v2/ticker/bitcoin/`)
    .then(response => response.json())
    .then(myTickerData => {
        
        coinName.textContent = myTickerData.data[1].name;
        
        coinPrice.textContent = "$" + (myTickerData.data[1].quotes.USD.price).toLocaleString("en-US");
        console.log(myTickerData.data[1].quotes.USD.volume_24h);
        coinVolume.textContent = "Volume traded in 24 hours: " + (myTickerData.data[1].quotes.USD.volume_24h).toLocaleString("en-US");
    });
}

document.body.appendChild(coinName);
document.body.appendChild(coinPrice);
document.body.appendChild(coinVolume);


// use jQuery 
let bodyEl = $('body');

getTrending();

function getTrending() {
    fetch(`https://api.coingecko.com/api/v3/search/trending`)
    .then(response => response.json())
    .then(myTrendingData => {

        // console.log(myTrendingData.coins[0].item.name);
        var coinPopularLength = myTrendingData.coins.length;
        
        for (var i = 0; i < coinPopularLength; i++) {
            var coinPopularName = myTrendingData.coins[i].item.name;
            // Top-7 trending coins on CoinGecko as searched by users in the last 24 hours (Ordered by most popular first)
            var coinPopularLi = $(`<li class="coinPopularListItemEl">${coinPopularName}</li>`);
            bodyEl.append(coinPopularLi);
        }

    });
}

document.body.appendChild(coinTrends);

/* <script type="text/javascript" src="https://ssl.gstatic.com/trends_nrtr/2884_RC01/embed_loader.js"></script>
<script type="text/javascript">
  trends.embed.renderExploreWidget("TIMESERIES", {"comparisonItem":[{"keyword":"buy bitcoin","geo":"","time":"2004-01-01 2022-04-11"},{"keyword":"buy ethereum","geo":"","time":"2004-01-01 2022-04-11"},{"keyword":"buy ripple","geo":"","time":"2004-01-01 2022-04-11"}],"category":0,"property":""}, {"exploreQuery":"date=all&q=buy%20bitcoin,buy%20ethereum,buy%20ripple","guestPath":"https://trends.google.com:443/trends/embed/"});
</script> */


var coinSymbolKVP = [
    {name:"Bitcoin", symbol: "BTC"},
    {name:"Ethereum", symbol:  "ETH"},
    {name:"Tether", symbol:  "USDT"},
    {name:"ION", symbol:"ION"},
    {name:"Binance Coin", symbol:  "BNB"	},
    {name:"USD Coin", symbol:  "USDC"},
    {name:"XRPV",symbol: "XRP"	},
    {name:"Solana", symbol:  "SOL"	},
    {name:"Cardano", symbol:  "ADA"},
    {name:"Terra", symbol:  "LUNA"},
    {name:"HEX", symbol:  "HEX"},
    {name:"Avalanche", symbol:  "AVAX"	},
    {name:"Dogecoin", symbol:  "DOGE"	},
    {name:"Binance", symbol:  "BUSD"},	
    {name:"Polkadot", symbol:  "DOT"},
    {name:"Terra", symbol:  "UST"	},
    {name:"SHIBA INU", symbol: "SHIB"},	
    {name:"Wrapped", symbol:  "BiB"},
    {name:"Polygon", symbol:  "MATIC"},	
    {name:"Crypto.com coin", symbol:  "CRO"},
    {name:"NEAR Protocol", symbol:  "NEAR"	},
    {name:"Dai", symbol:"DAI"	},
    {name:"Litecoin", symbol:  "LTC"},
    {name:"Cosmos", symbol:  "ATOM"},
    {name:"Chainlink", symbol:  "LINK"},	
    {name:"Uniswap", symbol:  "UNI"} ];
