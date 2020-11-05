/*----- constants -----*/
const suits = ['s', 'c', 'd', 'h'];
const ranks = ['02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K', 'A'];
let player1Deck = [];
let player2Deck = [];
let deckContainer = document.getElementById('master-deck-container')
console.log(deckContainer);
// Build a 'master' deck of 'card' objects used to create shuffled decks
const masterDeck = buildMasterDeck();
//renderDeckInContainer(masterDeck, deckContainer );

/*----- app's state (variables) -----*/
let shuffledDeck;

/*----- cached element references -----*/
const shuffledContainer = document.getElementById('shuffled-deck-container');

/*----- event listeners -----*/
document.querySelector('button').addEventListener('click', renderShuffledDeck);

/*----- functions -----*/
function renderShuffledDeck() {
  // Create a copy of the masterDeck (leave masterDeck untouched!)
  const tempDeck = [...masterDeck];
  shuffledDeck = [];
  while (tempDeck.length) {
    // Get a random index for a card still in the tempDeck
    const rndIdx = Math.floor(Math.random() * tempDeck.length);
    // Note the [0] after splice - this is because splice always returns an array and we just want the card object in that array
    shuffledDeck.push(tempDeck.splice(rndIdx, 1)[0]);
  }
  renderDeckInContainer(shuffledDeck);
}

function renderDeckInContainer(deck) {
  deckContainer.innerHTML = '';
  splitDeck(deck)
  console.log(player1Deck);
  let p1Card = player1Deck.pop()
  let p2Card = player2Deck.pop()
  let p1 = document.getElementById('p1')
  let p2 = document.getElementById('p2')
  p1.innerHTML= `<div class="card ${p1Card.face}"></div>`
  p2.innerHTML= `<div class="card ${p2Card.face}"></div>`
  if (p1Card.value > p2Card.value){
      player1Deck.push(p1Card, p2Card)
  } else {
      player2Deck.push(p1Card, p2Card)
  }
  document.getElementById('p1Score').innerHTML = player1Deck.length
  document.getElementById('p2Score').innerHTML = player2Deck.length
  // Let's build the cards as a string of HTML
  // Use reduce when you want to 'reduce' the array into a single thing - in this case a string of HTML markup 
//   const cardsHtml = deck.reduce(function(html, card) {
//     return html + `<div class="card ${card.face}"></div>`;
//   }, '');
  //console.log(cardsHtml);
  //deckContainer.innerHTML = cardsHtml;
}

function buildMasterDeck() {
  const deck = [];
  // Use nested forEach to generate card objects
  suits.forEach(function(suit) {
    ranks.forEach(function(rank) {
      deck.push({
        // The 'face' property maps to the library's CSS classes for cards
        face: `${suit}${rank}`,
        // Setting the 'value' property for game of blackjack, not war
        value: Number(rank) || (rank === 'A' ? 11 : 10)
      });
    });
  });
  return deck;
}

renderShuffledDeck();

function splitDeck (deck){
    deck.forEach((e,i) => {
        if (i %2){
            player1Deck.push(e)
        } else {
            player2Deck.push(e)
        }
    })
}