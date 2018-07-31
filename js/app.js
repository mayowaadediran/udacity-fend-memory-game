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

//variable to hold moves counter on html
let movesCount = document.querySelector(".moves");

//variable to define stars
let stars = document.getElementsByClassName("fa-star");

//variables to define timer html
let timer = document.querySelector(".timer");

let mins = 0;

let secs = 0;

//variable to hold matched cards
let matchedCards = document.getElementsByClassName("match");

//variable to hold modal message html
let modalMessage = document.getElementById("modal");

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

//@description Function to start game
function startGame() {
  cardDeck.innerHTML = "";
  createCard();
  mins = 0;
  secs = 0;
  timer.innerHTML = `${mins} mins ${secs} secs`;
}

//@decription Function to reload page
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

//@description Function to create shuffled card element
function createCard() {
  shuffledCards.forEach(card => {
    let cardHolder = document.createElement("li");
    cardHolder.classList.add("card");
    cardHolder.innerHTML = `<i class="fa ${card}"></i>`;
    cardDeck.appendChild(cardHolder);
    cardHolder.addEventListener("click", cardOpened);
  });
}


//@description Timer function 
var timerInterval;
function startTimer() {
    timerInterval = setInterval(timerCount, 1000);
    function timerCount() {
    timer.innerHTML = `${mins} mins ${secs} secs`;
    secs++;
    if (secs == 60) {
      mins++;
      secs = 0;
    };
  };
};

//@description Function to handle what happens when a card is opened
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

//@description Function to add match and disabled classlist to matched cards
function matched() {
  openCards[0].classList.add("match", "disabled");
  openCards[1].classList.add("match", "disabled");
  openCards = [];
};


//@description Function to remove show and open classlist from unmatched cards
function unmatched() {
  disable();
  openCards[0].classList.add("unmatched");
  openCards[1].classList.add("unmatched");
  setTimeout(() => {
    openCards[0].classList.remove("show", "open", "unmatched");
    openCards[1].classList.remove("show", "open", "unmatched");
    openCards = [];
    enable();
  }, 1100);
};

//@description Function to prevent other cards from being clicked 
function disable() {
  Array.prototype.forEach.call(cardList, cardElement => {
    cardElement.classList.add("disabled");
  });
};

//@description Enables cards to be clicked 
function enable() {
  Array.prototype.forEach.call(cardList, cardElement => {
    cardElement.classList.remove("disabled");
  });
};

//@description Counts moves and star rating 
function movesCounter() {
  moves++ ; 
  if (moves == 1) {
    startTimer();
  }

  movesCount.innerHTML = moves;
 if (moves >= 10 && moves < 20) {
   stars[2].style.visibility = "collapse";
 } else if (moves >= 21 && moves <= 30) {
   stars[1].style.visibility = "collapse";
 };
};

//@description Show modal at the end of the game 
function endGame() {
  if (matchedCards.length == 16) {

    //variables to get time and star ratings 
    var timeRating = timer.innerHTML; 
    var starRating = document.querySelector(".stars").innerHTML;

    //@description Function to show modal with rating scores 
    setTimeout(function () {
      modalMessage.style.visibility = "visible";
      clearInterval(timerInterval);
      document.getElementById("moves-rating").innerHTML = moves;
      document.getElementById("time-rating").innerHTML = timeRating;
      document.getElementById("star-rating").innerHTML = starRating;
    }, 1000);
  }

  //variable to hold close modal button
  closeModalButton = document.querySelector(".close-modal");
  closeModalButton.addEventListener("click", closeModal); 
};

//@description Close modal when close button is clicked 
function closeModal() {
    modalMessage.style.visibility = "hidden";
    disable();
};

