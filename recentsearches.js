

// use jQuery 
var coinsDropdown = $('#dropdownMenuList');
var coinsDropdownContainer = document.querySelector('#dropdownMenuList');

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

for (i = 0; i < coinSymbolKVP.length; i++) {
    // dynamically populate dropdown list of coin items
    var listEl = $(`<li class="dropdown-item" data-coin="${coinSymbolKVP[i].name}">${coinSymbolKVP[i].name}</li>`);
    coinsDropdown.append(listEl);
}

// add event listener to the 
coinsDropdownContainer.addEventListener("click", function(e) {
    // use event delegation to ensure clean event matches the link list items 
    if (e.target.matches('.dropdown-item')){
        // console.log(e.target.dataset.coin)
        storeCoinSearch(e.target.dataset.coin);
    }
});


// LOCAL STORAGE
// get local user storage data in order to append and/or render searches
var userPastSearches = JSON.parse(localStorage.getItem("userPastSearches"));

// grab search container element for appending
var searchesContainerEl = $(".past_search_container");

// check past searches and render them if they exist
checkPastSearches();

// checks local storage to see if there's some data to grab and display
function checkPastSearches() {
    // check local storage to see if there's some data to grab and display
    if (userPastSearches !== null) {
        // if there is something, display it If not, go on with rendering a placeholder.
        renderPastSearches();
    }
    else {
        var placeholderSearchItemEl = $(`<li class="list-group-item">Prior city searches will appear here...</li>`);
        searchesContainerEl.append(placeholderSearchItemEl);
    }
}

// inject / display the score list into HTML
function renderPastSearches() {
    // sort the searches from most recent to farthest back in time
    if (userPastSearches.length > 5) {
        var iterateLength = 5;
    }
    else if (userPastSearches.length <= 5 && userPastSearches.length > 0) {
        var iterateLength = userPastSearches.length;
    }
    else if (userPastSearches.length === null) {
        return;
    }
    // console.log(userPastSearches);
    for (var i = 0; i < iterateLength; i++) {
        // declare the particular list item from the todos array
        var coin = userPastSearches[i].searchedCoin;
        // for that list item make the list item in the DOM

        var searchItemEl = $(`<li class="list-group-item list-group-item-action list-group-item-dark text-center col-3" >${coin}</li>`);
        // populate its text as array value
        searchesContainerEl.append(searchItemEl);
    }
}


function storeCoinSearch(searchedCoinName) {
    if (userPastSearches === null) {
        userPastSearches = [
            {searchedCoin: searchedCoinName}
        ];
    }
    else {
        userPastSearches.unshift({searchedCoin: searchedCoinName});
    }
    // store userPastSearches item in local storage as strings 
    localStorage.setItem("userPastSearches", JSON.stringify(userPastSearches));
}



// function fetchyBoi() {
//     // Fetch go here
// }; 