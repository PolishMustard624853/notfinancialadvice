

// use jQuery 
var bodyEl = $('body');
var coinsDropdown = $('#dropdownMenuList');

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
    var listEl = $(`<li><a class="dropdown-item" href="#">${coinSymbolKVP[i].name}</a></li>`)
    coinsDropdown.append(listEl);
}
