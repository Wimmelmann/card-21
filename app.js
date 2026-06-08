const RANKS = [
  { label: 'A', name: 'Es', value: 1 },
  { label: '2', name: '2', value: 2 },
  { label: '3', name: '3', value: 3 },
  { label: '4', name: '4', value: 4 },
  { label: '5', name: '5', value: 5 },
  { label: '6', name: '6', value: 6 },
  { label: '7', name: '7', value: 7 },
  { label: '8', name: '8', value: 8 },
  { label: '9', name: '9', value: 9 },
  { label: '10', name: '10', value: 10 },
  { label: 'J', name: 'Knægt', value: 11 },
  { label: 'Q', name: 'Dame', value: 12 },
  { label: 'K', name: 'Konge', value: 13 },
];

const SUITS = [
  { symbol: '♠', color: 'black' },
  { symbol: '♥', color: 'red' },
  { symbol: '♦', color: 'red' },
  { symbol: '♣', color: 'black' },
];

const state = {
  players: [],
  deck: [],
  roundNumber: 1,
  cardsPerPlayer: 7,
  pointLimit: 21,
  currentPlayerIndex: 0,
  trickStarterIndex: 0,
  trickCards: [],
  currentHighestValue: null,
  awaitingContinue: false,
  gameOver: false,
};

const els = {
  setupView: document.querySelector('#setupView'),
  gameView: document.querySelector('#gameView'),
  playerCount: document.querySelector('#playerCount'),
  pointLimit: document.querySelector('#pointLimit'),
  playerSetup: document.querySelector('#playerSetup'),
  startGameBtn: document.querySelector('#startGameBtn'),
  newGameBtn: document.querySelector('#newGameBtn'),
  scoreList: document.querySelector('#scoreList'),
  cardsThisRound: document.querySelector('#cardsThisRound'),
  nextRoundInfo: document.querySelector('#nextRoundInfo'),
  roundLabel: document.querySelector('#roundLabel'),
  turnTitle: document.querySelector('#turnTitle'),
  turnHint: document.querySelector('#turnHint'),
  currentHighest: document.querySelector('#currentHighest'),
  trickCards: document.querySelector('#trickCards'),
  handTitle: document.querySelector('#handTitle'),
  handCards: document.querySelector('#handCards'),
  autoPlayBtn: document.querySelector('#autoPlayBtn'),
  continueBtn: document.querySelector('#continueBtn'),
  logList: document.querySelector('#logList'),
  rulesBtn: document.querySelector('#rulesBtn'),
  rulesDialog: document.querySelector('#rulesDialog'),
  closeRulesBtn: document.querySelector('#closeRulesBtn'),
};

function init() {
  renderPlayerSetup();
  bindEvents();
}

function bindEvents() {
  els.playerCount.addEventListener('change', renderPlayerSetup);
  els.startGameBtn.addEventListener('click', startGame);
  els.newGameBtn.addEventListener('click', resetToSetup);
  els.autoPlayBtn.addEventListener('click', () => {
    if (state.gameOver || state.awaitingContinue) return;
    const player = currentPlayer();
    const card = chooseRecommendedCard(player);
    if (card) playCard(player.id, card.id);
  });
  els.continueBtn.addEventListener('click', continueAfterPause);
  els.rulesBtn.addEventListener('click', () => els.rulesDialog.showModal());
  els.closeRulesBtn.addEventListener('click', () => els.rulesDialog.close());
}

function renderPlayerSetup() {
  const count = Number(els.playerCount.value);
  els.playerSetup.innerHTML = '';

  for (let i = 0; i < count; i++) {
    const row = document.createElement('div');
    row.className = 'player-row';
    row.innerHTML = `
      <label>
        Spiller ${i + 1}
        <input id="playerName-${i}" value="${i === 0 ? 'Søren' : `Spiller ${i + 1}`}" />
      </label>
      <label>
        Type
        <select id="playerType-${i}">
          <option value="human" ${i === 0 ? 'selected' : ''}>Menneske</option>
          <option value="ai" ${i > 0 ? 'selected' : ''}>Computer</option>
        </select>
      </label>
    `;
    els.playerSetup.appendChild(row);
  }
}

function startGame() {
  const count = Number(els.playerCount.value);
  state.players = Array.from({ length: count }, (_, i) => ({
    id: `p${i}`,
    name: document.querySelector(`#playerName-${i}`).value.trim() || `Spiller ${i + 1}`,
    type: document.querySelector(`#playerType-${i}`).value,
    score: 0,
    hand: [],
    lastPenaltyCard: null,
  }));
  state.pointLimit = Number(els.pointLimit.value);
  state.roundNumber = 1;
  state.cardsPerPlayer = 7;
  state.currentPlayerIndex = 0;
  state.trickStarterIndex = 0;
  state.gameOver = false;
  state.awaitingContinue = false;
  clearLog();
  addLog('Spillet er startet. Første runde spilles med 7 kort.', true);

  els.setupView.classList.add('hidden');
  els.gameView.classList.remove('hidden');
  startRound();
}

function resetToSetup() {
  els.gameView.classList.add('hidden');
  els.setupView.classList.remove('hidden');
}

function startRound() {
  state.deck = shuffle(createDeck());
  state.trickCards = [];
  state.currentHighestValue = null;
  state.awaitingContinue = false;

  for (const player of state.players) {
    player.hand = state.deck.splice(0, state.cardsPerPlayer).sort(sortCards);
  }

  state.currentPlayerIndex = state.trickStarterIndex % state.players.length;
  addLog(`Runde ${state.roundNumber}: Alle får ${state.cardsPerPlayer} kort.`, true);
  render();
  maybeAutoPlay();
}

function createDeck() {
  const deck = [];
  for (const suit of SUITS) {
    for (const rank of RANKS) {
      deck.push({
        id: `${rank.label}${suit.symbol}-${crypto.randomUUID ? crypto.randomUUID() : Math.random()}`,
        ...rank,
        suit: suit.symbol,
        color: suit.color,
      });
    }
  }
  return deck;
}

function shuffle(deck) {
  const copy = [...deck];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function sortCards(a, b) {
  if (a.value !== b.value) return a.value - b.value;
  return a.suit.localeCompare(b.suit);
}

function currentPlayer() {
  return state.players[state.currentPlayerIndex];
}

function getPlayableCards(player) {
  if (state.currentHighestValue === null) return [...player.hand];

  const beatingCards = player.hand.filter(card => card.value >= state.currentHighestValue);
  if (beatingCards.length > 0) return beatingCards;

  const lowestValue = Math.min(...player.hand.map(card => card.value));
  return player.hand.filter(card => card.value === lowestValue);
}

function canPlayCard(player, card) {
  return getPlayableCards(player).some(playable => playable.id === card.id);
}

function chooseRecommendedCard(player) {
  const playable = getPlayableCards(player).sort(sortCards);
  if (state.currentHighestValue === null) return playable[0];

  const beatingCards = playable.filter(card => card.value >= state.currentHighestValue);
  if (beatingCards.length > 0) return beatingCards[0];

  return playable[0];
}

function playCard(playerId, cardId) {
  const player = state.players.find(p => p.id === playerId);
  if (!player || player.id !== currentPlayer().id) return;

  const cardIndex = player.hand.findIndex(card => card.id === cardId);
  if (cardIndex < 0) return;

  const card = player.hand[cardIndex];
  if (!canPlayCard(player, card)) return;

  player.hand.splice(cardIndex, 1);
  state.trickCards.push({ playerId: player.id, card });

  if (state.currentHighestValue === null || card.value >= state.currentHighestValue) {
    state.currentHighestValue = card.value;
  }

  addLog(`${player.name} lægger ${cardName(card)}.`);

  if (state.trickCards.length === state.players.length) {
    finishTrick();
    return;
  }

  state.currentPlayerIndex = (state.currentPlayerIndex + 1) % state.players.length;
  render();
  maybeAutoPlay();
}

function finishTrick() {
  const highestValue = Math.max(...state.trickCards.map(entry => entry.card.value));
  const firstHighest = state.trickCards.find(entry => entry.card.value === highestValue);
  state.trickStarterIndex = state.players.findIndex(player => player.id === firstHighest.playerId);

  addLog(`Stikket er færdigt. ${playerName(firstHighest.playerId)} starter næste stik med ${valueName(highestValue)}.`, true);

  const cardsLeft = state.players[0].hand.length;
  if (cardsLeft === 1) {
    state.awaitingContinue = true;
    render();
    addLog('Nu sidder alle med ét kort tilbage. Næste kort afgør runden.', true);
    return;
  }

  if (cardsLeft === 0) {
    finishRound();
    return;
  }

  state.trickCards = [];
  state.currentHighestValue = null;
  state.currentPlayerIndex = state.trickStarterIndex;
  state.awaitingContinue = true;
  render();
}

function continueAfterPause() {
  if (state.gameOver) {
    resetToSetup();
    return;
  }

  state.awaitingContinue = false;

  const allHandsEmpty = state.players.every(player => player.hand.length === 0);
  if (allHandsEmpty && state.trickCards.length === 0) {
    startRound();
    return;
  }

  const cardsLeft = state.players[0].hand.length;
  if (state.trickCards.length === state.players.length && cardsLeft > 0) {
    state.trickCards = [];
    state.currentHighestValue = null;
    state.currentPlayerIndex = state.trickStarterIndex;
  }

  render();
  maybeAutoPlay();
}

function finishRound() {
  const finalEntries = state.trickCards;
  const highestValue = Math.max(...finalEntries.map(entry => entry.card.value));
  const losers = finalEntries.filter(entry => entry.card.value === highestValue);

  for (const entry of losers) {
    const player = state.players.find(p => p.id === entry.playerId);
    player.score += entry.card.value;
    player.lastPenaltyCard = entry.card;
  }

  const loserNames = losers.map(entry => playerName(entry.playerId)).join(', ');
  addLog(`${loserNames} taber runden med ${valueName(highestValue)} og får ${highestValue} strafpoint.`, true);

  state.cardsPerPlayer = Math.min(highestValue, 10);
  const busted = state.players.filter(player => player.score > state.pointLimit);

  if (busted.length > 0) {
    state.gameOver = true;
    state.awaitingContinue = true;
    const names = busted.map(player => player.name).join(', ');
    addLog(`Spillet er slut. ${names} kom over ${state.pointLimit} point.`, true);
    render();
    return;
  }

  state.roundNumber += 1;
  state.trickCards = [];
  state.currentHighestValue = null;
  state.awaitingContinue = true;
  render();
}

function maybeAutoPlay() {
  if (state.awaitingContinue || state.gameOver) return;
  const player = currentPlayer();
  if (player.type !== 'ai') return;

  window.setTimeout(() => {
    if (state.awaitingContinue || state.gameOver || currentPlayer().id !== player.id) return;
    const card = chooseRecommendedCard(player);
    playCard(player.id, card.id);
  }, 650);
}

function render() {
  renderScores();
  renderTable();
  renderHand();
  renderControls();
}

function renderScores() {
  els.scoreList.innerHTML = '';

  for (let i = 0; i < state.players.length; i++) {
    const player = state.players[i];
    const div = document.createElement('div');
    div.className = 'score-card';
    if (!state.gameOver && i === state.currentPlayerIndex && !state.awaitingContinue) div.classList.add('active');
    if (player.score > state.pointLimit) div.classList.add('danger');

    div.innerHTML = `
      <div class="score-card-top">
        <strong>${escapeHtml(player.name)}</strong>
        <span>${player.type === 'ai' ? 'Computer' : 'Spiller'}</span>
      </div>
      <div>${player.score} / ${state.pointLimit + 1} point</div>
      <span>${player.hand.length} kort på hånden</span>
    `;
    els.scoreList.appendChild(div);
  }

  els.cardsThisRound.textContent = `${state.cardsPerPlayer} kort`;
  els.nextRoundInfo.textContent = state.gameOver ? 'Spillet er slut' : 'Afgøres af taberkort';
}

function renderTable() {
  els.roundLabel.textContent = `Runde ${state.roundNumber}`;

  if (state.gameOver) {
    els.turnTitle.textContent = 'Spillet er slut';
    els.turnHint.textContent = 'Tryk Nyt spil for at starte igen.';
  } else if (state.awaitingContinue) {
    els.turnTitle.textContent = 'Stik/runde færdig';
    els.turnHint.textContent = 'Tryk Fortsæt.';
  } else {
    const player = currentPlayer();
    els.turnTitle.textContent = `${player.name}s tur`;
    els.turnHint.textContent = turnHintFor(player);
  }

  els.currentHighest.textContent = state.currentHighestValue === null ? '-' : valueName(state.currentHighestValue);
  els.trickCards.innerHTML = '';

  if (state.trickCards.length === 0) {
    els.trickCards.innerHTML = '<p class="hint">Ingen kort på bordet endnu.</p>';
    return;
  }

  for (const entry of state.trickCards) {
    const wrap = document.createElement('div');
    wrap.appendChild(renderCard(entry.card));
    const owner = document.createElement('span');
    owner.className = 'card-owner';
    owner.textContent = playerName(entry.playerId);
    wrap.querySelector('.playing-card').appendChild(owner);
    els.trickCards.appendChild(wrap);
  }
}

function renderHand() {
  const player = currentPlayer();
  els.handCards.innerHTML = '';

  if (!player || state.gameOver) {
    els.handTitle.textContent = 'Hånd';
    return;
  }

  els.handTitle.textContent = player.type === 'ai' ? `${player.name}s hånd` : `${player.name}s hånd`;

  if (player.type === 'ai' && !state.awaitingContinue) {
    els.handCards.innerHTML = '<p class="hint">Computer-spilleren tænker...</p>';
    return;
  }

  if (player.hand.length === 0) {
    els.handCards.innerHTML = '<p class="hint">Ingen kort tilbage.</p>';
    return;
  }

  const playableCards = getPlayableCards(player);
  const playableIds = new Set(playableCards.map(card => card.id));

  for (const card of player.hand) {
    const btn = document.createElement('button');
    btn.className = 'hand-card-btn';
    btn.disabled = state.awaitingContinue || player.type === 'ai' || !playableIds.has(card.id);
    btn.addEventListener('click', () => playCard(player.id, card.id));
    btn.appendChild(renderCard(card));

    const reason = document.createElement('span');
    reason.className = 'card-reason';
    reason.textContent = playableIds.has(card.id) && !state.awaitingContinue ? 'Kan spilles' : '';
    btn.appendChild(reason);
    els.handCards.appendChild(btn);
  }
}

function renderControls() {
  const player = currentPlayer();
  const showContinue = state.awaitingContinue || state.gameOver;
  els.continueBtn.classList.toggle('hidden', !showContinue);
  els.autoPlayBtn.classList.toggle('hidden', showContinue);
  els.continueBtn.textContent = state.gameOver ? 'Til start' : nextContinueText();
  els.autoPlayBtn.disabled = !player || player.type === 'ai' || state.gameOver || state.awaitingContinue;
}

function nextContinueText() {
  if (state.trickCards.length === state.players.length && state.players[0].hand.length === 0) {
    return 'Næste runde';
  }
  if (state.trickCards.length === 0 && state.players.every(player => player.hand.length === 0)) {
    return 'Næste runde';
  }
  if (state.trickCards.length === 0) return 'Fortsæt';
  if (state.players[0].hand.length === 1) return 'Spil sidste kort';
  return 'Næste stik';
}

function renderCard(card) {
  const div = document.createElement('div');
  div.className = `playing-card ${card.color === 'red' ? 'red' : ''}`;
  div.innerHTML = `
    <span class="card-suit">${card.suit}</span>
    <span class="card-rank">${card.label}</span>
  `;
  return div;
}

function turnHintFor(player) {
  if (state.currentHighestValue === null) return 'Du starter stikket. Vælg et kort.';

  const canBeat = player.hand.some(card => card.value >= state.currentHighestValue);
  if (canBeat) return `Du skal lægge ${valueName(state.currentHighestValue)} eller højere.`;
  return 'Du kan ikke stikke og skal smide dit laveste kort.';
}

function playerName(playerId) {
  return state.players.find(player => player.id === playerId)?.name || 'Ukendt';
}

function cardName(card) {
  return `${card.name}${card.suit}`;
}

function valueName(value) {
  const rank = RANKS.find(rank => rank.value === value);
  return rank ? rank.name : String(value);
}

function addLog(message, important = false) {
  const div = document.createElement('div');
  div.className = `log-entry ${important ? 'important' : ''}`;
  div.textContent = message;
  els.logList.prepend(div);
}

function clearLog() {
  els.logList.innerHTML = '';
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

init();
