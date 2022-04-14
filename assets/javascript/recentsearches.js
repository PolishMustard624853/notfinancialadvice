
// event listeners for button click or search
$('.search-btn').on("click", function () {
    // call local storage function
    storeCoinSearch(userCoinInputEl.val());
});

// get coin name from user form
var userCoinInputEl = $('#coin_input');
// hook into button it clicking when a keyup equals enter in the form field
userCoinInputEl.keydown( e => {
    if (e.keyCode === 13) {
        // prevent form default behaviors
        e.preventDefault();
        // call local storage function
        storeCoinSearch(userCoinInputEl.val());
        renderPastSearches();
    } 
});    

var coinsDropdownContainer = document.querySelector('#past_search_container');

// add event listener to the dropdown list items themselves
coinsDropdownContainer.addEventListener("click", function(e) {
    // use event delegation to ensure clean event matches the link list items 
    if (e.target.matches('.dropdown-item')){
        // console.log(e.target.dataset.coin);
        storeCoinSearch(e.target.dataset.coin);
        userCoinInputEl.val(e.target.dataset.coin);
        renderPastSearches();
    }
});

// LOCAL STORAGE
// get local user storage data in order to append and/or render searches
var userPastSearches = JSON.parse(localStorage.getItem("userPastSearches")) || [];

// grab search container element for appending
var searchesContainerEl = $("#past_search_container");

renderPastSearches();

// clears old elements when a new search is conducted so that the list can be re-rendered cleanly
function clearOldSearches() {
    $('.searched_items').remove();
}

// inject / display the score list into HTML
function renderPastSearches() {
    $('.searched_items').remove();
    // sort the searches from most recent to farthest back in time
    if (userPastSearches.length > 5) {
        var iterateLength = 5;
    }
    else if (userPastSearches.length <= 5 && userPastSearches.length > 0) {
        var iterateLength = userPastSearches.length;
    }
    else if (userPastSearches.length == 0) {
        var placeholderSearchItemEl = $(`<li class="dropdown-item searched_items" >Prior coin searches will appear here...</li>`)
        searchesContainerEl.append(placeholderSearchItemEl);
    }
    // console.log(userPastSearches);
    for (var i = 0; i < iterateLength; i++) {
        // declare the particular list item from the todos array
        var coin = userPastSearches[i].searchedCoin;
        // for that list item make the list item in the DOM
        
        var searchItemEl = $(`<li class="dropdown-item searched_items" data-coin="${coin}">${coin}</li>`);
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
