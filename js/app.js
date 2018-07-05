/*
 * Create a list that holds all of your cards
 */
let cards = ['fa-diamond', 'fa-diamond', 'fa-paper-plane-o', 'fa-paper-plane-o', 'fa-anchor', 'fa-anchor', 'fa-bolt', 'fa-bolt', 'fa-cube', 'fa-cube', 'fa-bomb', 'fa-bomb', 'fa-leaf', 'fa-leaf', 'fa-bicycle', 'fa-bicycle'];

//variable to define card ul 
let cardDeck = document.querySelector(".deck"); 

//array to hold opened cards 
openCards = []; 

//variable to hold card li html 
let cardList = document.getElementsByClassName("card"); 

//variable to count moves
let moves = 0;

//variable to hold moves counter on htlm
let movesCount = document.querySelector(".moves");

//variable to define stars
let stars = document.getElementsByClassName("fa-star");

//
let timer = document.querySelector(".timer");

let mins = 0;

let secs = 0;

//
let matchedCards = document.getElementsByClassName("match");

//variable to hold shuffled cards 
let shuffledCards = shuffle(cards);

//start game on page load
document.body.onload = startGame();




// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function startGame() {
  cardDeck.innerHTML = "";
  createCard();
  mins = 0;
  secs = 0;
  timer.innerHTML = `${mins} mins ${secs} secs`;
}

function refresh() {
  setTimeout(function () {
    location.reload()
  }, 100);
}

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

//function to create shuffled card element
function createCard() {
  shuffledCards.forEach(card => {
    let cardHolder = document.createElement("li");
    cardHolder.classList.add("card");
    cardHolder.innerHTML = `<i class="fa ${card}"></i>`;
    cardDeck.appendChild(cardHolder);
    cardHolder.addEventListener("click", cardOpened);
  });
}

function startTimer() {
  
  setInterval(function(){
    timer.innerHTML = `${mins} mins ${secs} secs`;
    secs++;
    if (secs == 60) {
      mins++;
      secs = 0;
    }
  }, 1000);
  
};

function cardOpened() {
  this.classList.add("show", "open", "disabled");
  movesCounter();
  openCards.push(this);
  if (openCards.length === 2) {
    if (openCards[0].innerHTML === openCards[1].innerHTML) {
      matched();
    }
    else {
      unmatched();
    }
  }
  endGame();
};

function matched() {
  openCards[0].classList.add("match", "disabled");
  openCards[1].classList.add("match", "disabled");
  openCards = [];
};

function unmatched() {
  disable();
  setTimeout(() => {
    openCards[0].classList.remove("show", "open");
    openCards[1].classList.remove("show", "open");
    openCards = [];
    enable();
  }, 1100);
};

function disable() {
  Array.prototype.forEach.call(cardList, cardElement => {
    cardElement.classList.add("disabled");
  });
};

function enable() {
  Array.prototype.forEach.call(cardList, cardElement => {
    cardElement.classList.remove("disabled");
  });
};

function movesCounter() {
  moves++ ; 
  if (moves == 1) {
    startTimer();
  }
  movesCount.innerHTML = moves;
 if (moves >= 10 && moves <= 15) {
   stars[2].remove();
 } else if (moves >= 16 && moves <= 21) {
   stars[1].remove();
 } else if (moves > 22) {
   stars[0].remove();
 };
};

function endGame() {
  if (matchedCards.length == 16) {
    setTimeout(function () {
      ;
    }, 1000);
  }
};


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
