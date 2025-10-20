const board = document.querySelector('.game-board');
const restartBtn = document.getElementById('restart-btn');

let cards = ['🍀','🍀','🍎','🍎','🌙','🌙','🔥','🔥','⚡','⚡','🌻','🌻','💧','💧','⭐','⭐'];

// Shuffle cards
cards.sort(() => 0.5 - Math.random());

// Create cards
cards.forEach(symbol => {
  const card = document.createElement('div');
  card.classList.add('card');
  card.dataset.symbol = symbol;
  board.appendChild(card);
});

let flipped = [];
board.addEventListener('click', e => {
  if (e.target.classList.contains('card') && flipped.length < 2 && !e.target.classList.contains('flipped')) {
    e.target.textContent = e.target.dataset.symbol;
    e.target.classList.add('flipped');
    flipped.push(e.target);
  }
  if (flipped.length === 2) checkMatch();
});

function checkMatch() {
  const [card1, card2] = flipped;
  if (card1.dataset.symbol === card2.dataset.symbol) {
    flipped = [];
  } else {
    setTimeout(() => {
      card1.textContent = '';
      card2.textContent = '';
      card1.classList.remove('flipped');
      card2.classList.remove('flipped');
      flipped = [];
    }, 800);
  }
}

restartBtn.addEventListener('click', () => window.location.reload());