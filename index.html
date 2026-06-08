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
  nextRoundCards: null,
  lastRoundResult: null,
  pointLimit: 21,
  currentPlayerIndex: 0,
  roundStarterIndex: 0,
  pileCards: [],
  topCardValue: null,
  finalPhase: false,
  awaitingContinue: false,
  gameOver: false,
  soundEnabled: true,
  cardBack: 'red',
  felt: 'green',
};

const els = {
  setupView: document.querySelector('#setupView'),
  gameView: document.querySelector('#gameView'),
  playerCount: document.querySelector('#playerCount'),
  pointLimit: document.querySelector('#pointLimit'),
  playerSetup: document.querySelector('#playerSetup'),
  soundSetting: document.querySelector('#soundSetting'),
  cardBackSelect: document.querySelector('#cardBackSelect'),
  feltSelect: document.querySelector('#feltSelect'),
  soundSettingGame: document.querySelector('#soundSettingGame'),
  cardBackSelectGame: document.querySelector('#cardBackSelectGame'),
  feltSelectGame: document.querySelector('#feltSelectGame'),
  startGameBtn: document.querySelector('#startGameBtn'),
  newGameBtn: document.querySelector('#newGameBtn'),
  settingsBtn: document.querySelector('#settingsBtn'),
  settingsPanel: document.querySelector('#settingsPanel'),
  seatLayer: document.querySelector('#seatLayer'),
  cardsThisRound: document.querySelector('#cardsThisRound'),
  nextRoundInfo: document.querySelector('#nextRoundInfo'),
  pileCount: document.querySelector('#pileCount'),
  roundLabel: document.querySelector('#roundLabel'),
  turnTitle: document.querySelector('#turnTitle'),
  turnHint: document.querySelector('#turnHint'),
  currentTopCard: document.querySelector('#currentTopCard'),
  pileZone: document.querySelector('#pileZone'),
  finalReveal: document.querySelector('#finalReveal'),
  roundResult: document.querySelector('#roundResult'),
  handTitle: document.querySelector('#handTitle'),
  handCount: document.querySelector('#handCount'),
  handCards: document.querySelector('#handCards'),
  autoPlayBtn: document.querySelector('#autoPlayBtn'),
  continueBtn: document.querySelector('#continueBtn'),
  logList: document.querySelector('#logList'),
  rulesBtn: document.querySelector('#rulesBtn'),
  rulesDialog: document.querySelector('#rulesDialog'),
  closeRulesBtn: document.querySelector('#closeRulesBtn'),
};

let audioContext = null;

function init() {
  renderPlayerSetup();
  bindEvents();
  syncAppearanceFromControls();
}

function bindEvents() {
  els.playerCount.addEventListener('change', renderPlayerSetup);
  els.startGameBtn.addEventListener('click', startGame);
  els.newGameBtn.addEventListener('click', resetToSetup);
  els.settingsBtn.addEventListener('click', () => els.settingsPanel.classList.toggle('hidden'));

  els.autoPlayBtn.addEventListener('click', () => {
    if (state.gameOver || state.awaitingContinue) return;
    const player = currentPlayer();
    const card = chooseRecommendedCard(player);
    if (card) playCard(player.id, card.id);
  });

  els.continueBtn.addEventListener('click', continueAfterPause);
  els.rulesBtn.addEventListener('click', () => els.rulesDialog.showModal());
  els.closeRulesBtn.addEventListener('click', () => els.rulesDialog.close());

  for (const el of [els.soundSetting, els.soundSettingGame]) {
    el.addEventListener('change', (event) => setSound(event.target.value));
  }
  for (const el of [els.cardBackSelect, els.cardBackSelectGame]) {
    el.addEventListener('change', (event) => setCardBack(event.target.value));
  }
  for (const el of [els.feltSelect, els.feltSelectGame]) {
    el.addEventListener('change', (event) => setFelt(event.target.value));
  }
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
  state.nextRoundCards = null;
  state.lastRoundResult = null;
  state.currentPlayerIndex = 0;
  state.roundStarterIndex = 0;
  state.gameOver = false;
  state.awaitingContinue = false;
  state.finalPhase = false;
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
  if (state.nextRoundCards !== null) {
    state.cardsPerPlayer = state.nextRoundCards;
  }

  state.nextRoundCards = null;
  state.lastRoundResult = null;
  state.deck = shuffle(createDeck());
  state.pileCards = [];
  state.topCardValue = null;
  state.finalPhase = state.cardsPerPlayer === 1;
  state.awaitingContinue = false;

  for (const player of state.players) {
    player.hand = state.deck.splice(0, state.cardsPerPlayer).sort(sortCards);
  }

  state.currentPlayerIndex = state.roundStarterIndex % state.players.length;
  addLog(`Runde ${state.roundNumber}: ${state.cardsPerPlayer} kort til hver spiller.`, true);
  if (state.finalPhase) {
    addLog('Alle har kun ét kort. Runden afgøres direkte.', true);
  }

  playDealSound();
  render();
  maybeAutoPlay();
}

function createDeck() {
  const deck = [];
  for (const suit of SUITS) {
    for (const rank of RANKS) {
      deck.push({
        id: `${rank.label}${suit.symbol}-${uniqueId()}`,
        ...rank,
        suit: suit.symbol,
        color: suit.color,
      });
    }
  }
  return deck;
}

function uniqueId() {
  if (globalThis.crypto && typeof globalThis.crypto.randomUUID === 'function') return globalThis.crypto.randomUUID();
  return Math.random().toString(36).slice(2);
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
  if (!player || player.hand.length === 0) return [];
  if (state.topCardValue === null) return [...player.hand];

  const matchingOrHigherCards = player.hand.filter(card => card.value >= state.topCardValue);
  if (matchingOrHigherCards.length > 0) return matchingOrHigherCards;

  const lowestValue = Math.min(...player.hand.map(card => card.value));
  return player.hand.filter(card => card.value === lowestValue);
}

function canPlayCard(player, card) {
  return getPlayableCards(player).some(playable => playable.id === card.id);
}

function chooseRecommendedCard(player) {
  const playable = getPlayableCards(player).sort(sortCards);
  if (playable.length === 0) return null;

  const handSize = player.hand.length;
  const lowest = playable[0];
  const lowCards = player.hand.filter(card => card.value <= 5).length;
  const highCards = player.hand.filter(card => card.value >= 11).sort(sortCards);
  const nextPlayer = state.players[(state.currentPlayerIndex + 1) % state.players.length];
  const endgame = handSize <= 3;
  const nonAces = playable.filter(card => card.value > 1).sort(sortCards);
  const lowestNonAce = nonAces[0] || lowest;

  if (state.topCardValue === null) {
    if (handSize === 1) return player.hand[0];

    const middleCards = playable.filter(card => card.value >= 6 && card.value <= 10).sort(sortCards);
    const nonProtectedCards = playable.filter(card => card.value >= 6).sort(sortCards);
    const smallButNotAce = playable.filter(card => card.value > 1 && card.value <= 5).sort(sortCards);

    if (endgame) {
      const dangerousCards = playable.filter(card => card.value >= 10).sort(sortCards);
      if (dangerousCards.length > 0 && lowCards > 0) return dangerousCards[dangerousCards.length - 1];
      if (nonAces.length > 0) return nonAces[nonAces.length - 1];
      return lowest;
    }

    if (middleCards.length > 0) return middleCards[0];
    if (highCards.length >= 2 && lowCards >= 2) return highCards[0];
    if (nonProtectedCards.length > 0) return nonProtectedCards[0];
    if (smallButNotAce.length > 0) return smallButNotAce[smallButNotAce.length - 1];
    return lowestNonAce;
  }

  const matchingOrHigherCards = player.hand.filter(card => card.value >= state.topCardValue).sort(sortCards);
  if (matchingOrHigherCards.length === 0) return lowest;

  const nonAceOptions = matchingOrHigherCards.filter(card => card.value > 1).sort(sortCards);
  const safeOptions = nonAceOptions.length > 0 ? nonAceOptions : matchingOrHigherCards;
  const lowestLegal = safeOptions[0];
  const pressureCards = safeOptions.filter(card => card.value >= 11).sort(sortCards);
  const canApplyPressure = pressureCards.length > 0
    && state.topCardValue <= 11
    && nextPlayer
    && (nextPlayer.hand.length <= 3 || nextPlayer.score >= 12 || handSize <= 4);

  if (canApplyPressure) return pressureCards[0];

  if (endgame && highCards.length > 0) {
    const dangerousPlayable = safeOptions.filter(card => card.value >= 10).sort(sortCards);
    if (dangerousPlayable.length > 0 && lowCards > 0) return dangerousPlayable[dangerousPlayable.length - 1];
  }

  return lowestLegal;
}

function playCard(playerId, cardId) {
  const player = state.players.find(p => p.id === playerId);
  if (!player || player.id !== currentPlayer().id) return;

  const cardIndex = player.hand.findIndex(card => card.id === cardId);
  if (cardIndex < 0) return;

  const card = player.hand[cardIndex];
  if (!canPlayCard(player, card)) return;

  const wasFinalCard = player.hand.length === 1;
  player.hand.splice(cardIndex, 1);
  state.pileCards.push({ playerId: player.id, card, wasFinalCard });
  state.topCardValue = card.value;

  playCardSound();

  if (state.players.every(p => p.hand.length === 0)) {
    finishRound();
    return;
  }

  if (!state.finalPhase && state.players.every(p => p.hand.length === 1)) {
    state.finalPhase = true;
    state.awaitingContinue = true;
    state.currentPlayerIndex = nextPlayerWithCards((state.currentPlayerIndex + 1) % state.players.length);
    render();
    addLog('Alle sidder med ét kort tilbage. Fortsæt for at afgøre runden.', true);
    return;
  }

  state.currentPlayerIndex = (state.currentPlayerIndex + 1) % state.players.length;
  render();
  maybeAutoPlay();
}

function continueAfterPause() {
  if (state.gameOver) {
    resetToSetup();
    return;
  }

  const allHandsEmpty = state.players.every(player => player.hand.length === 0);
  if (allHandsEmpty && state.pileCards.length === 0) {
    startRound();
    return;
  }

  state.awaitingContinue = false;
  state.currentPlayerIndex = nextPlayerWithCards(state.currentPlayerIndex);
  render();
  maybeAutoPlay();
}

function nextPlayerWithCards(startIndex) {
  if (state.players.every(player => player.hand.length === 0)) return startIndex;

  let index = startIndex % state.players.length;
  for (let i = 0; i < state.players.length; i++) {
    if (state.players[index].hand.length > 0) return index;
    index = (index + 1) % state.players.length;
  }
  return startIndex;
}

function finishRound() {
  const finalEntries = state.pileCards.filter(entry => entry.wasFinalCard);
  const highestValue = Math.max(...finalEntries.map(entry => entry.card.value));
  const losers = finalEntries.filter(entry => entry.card.value === highestValue);
  const resetPlayers = [];

  for (const entry of losers) {
    const player = state.players.find(p => p.id === entry.playerId);
    player.score += entry.card.value;
    player.lastPenaltyCard = entry.card;

    if (player.score === state.pointLimit) {
      player.score = 0;
      resetPlayers.push(player.name);
    }
  }

  const finalSummary = finalEntries
    .map(entry => `${playerName(entry.playerId)}: ${cardName(entry.card)}`)
    .join(' · ');
  const loserNames = losers.map(entry => playerName(entry.playerId)).join(', ');

  state.nextRoundCards = Math.min(highestValue, 10);
  state.lastRoundResult = {
    loserNames,
    loserIds: losers.map(entry => entry.playerId),
    highestValue,
    nextCards: state.nextRoundCards,
    capped: highestValue > 10,
    finalEntries: finalEntries.map(entry => ({
      playerId: entry.playerId,
      card: entry.card,
    })),
    finalSummary,
  };

  addLog(`Sidste kort: ${finalSummary}.`, true);
  addLog(`${loserNames} taber med ${valueName(highestValue)}. Næste runde: ${state.nextRoundCards} kort${highestValue > 10 ? ' (loft på 10)' : ''}.`, true);

  if (resetPlayers.length > 0) {
    addLog(`${resetPlayers.join(', ')} rammer præcis ${state.pointLimit} og nulstiller pointbunken til 0.`, true);
  }

  state.roundStarterIndex = state.players.findIndex(player => player.id === losers[0].playerId);
  const busted = state.players.filter(player => player.score > state.pointLimit);

  if (busted.length > 0) {
    state.gameOver = true;
    state.awaitingContinue = true;
    const names = busted.map(player => player.name).join(', ');
    addLog(`Spillet er slut. ${names} kom over ${state.pointLimit} point.`, true);
    state.pileCards = [];
    state.topCardValue = null;
    render();
    return;
  }

  state.roundNumber += 1;
  state.pileCards = [];
  state.topCardValue = null;
  state.finalPhase = false;
  state.awaitingContinue = true;
  render();
}

function maybeAutoPlay() {
  if (state.awaitingContinue || state.gameOver) return;
  const player = currentPlayer();
  if (!player || player.type !== 'ai') return;

  window.setTimeout(() => {
    if (state.awaitingContinue || state.gameOver || currentPlayer().id !== player.id) return;
    const card = chooseRecommendedCard(player);
    if (card) playCard(player.id, card.id);
  }, 650);
}

function render() {
  renderSeats();
  renderStatus();
  renderTable();
  renderHand();
  renderControls();
}

function renderSeats() {
  els.seatLayer.innerHTML = '';
  state.players.forEach((player, index) => {
    const div = document.createElement('div');
    div.className = `player-seat ${seatClassForIndex(index, state.players.length)}`;
    if (!state.gameOver && index === state.currentPlayerIndex && !state.awaitingContinue) div.classList.add('active');
    if (player.score > state.pointLimit) div.classList.add('danger');
    div.innerHTML = `
      <span class="name">${escapeHtml(player.name)}</span>
      <span class="points">${player.score} point</span>
    `;
    els.seatLayer.appendChild(div);
  });
}

function seatClassForIndex(index, count) {
  if (count === 2) return ['seat-bottom', 'seat-top'][index] || 'seat-top';
  if (count === 3) return ['seat-bottom', 'seat-left', 'seat-right'][index] || 'seat-top';
  return ['seat-bottom', 'seat-left', 'seat-top', 'seat-right'][index] || 'seat-top';
}

function finalClassForPlayerId(playerId) {
  const index = state.players.findIndex(player => player.id === playerId);
  const seatClass = seatClassForIndex(index, state.players.length);
  return seatClass.replace('seat-', 'final-');
}

function renderStatus() {
  els.cardsThisRound.textContent = `${state.cardsPerPlayer} kort`;
  els.pileCount.textContent = `${state.pileCards.length} kort`;

  if (state.gameOver) {
    els.nextRoundInfo.textContent = 'Spillet er slut';
  } else if (state.nextRoundCards !== null) {
    els.nextRoundInfo.textContent = `${state.nextRoundCards} kort`;
  } else {
    els.nextRoundInfo.textContent = '—';
  }
}

function renderTable() {
  els.roundLabel.textContent = `Runde ${state.roundNumber} · ${state.cardsPerPlayer} kort`;

  if (state.gameOver) {
    els.turnTitle.textContent = 'Spillet er slut';
    els.turnHint.textContent = 'Tryk Nyt spil for at starte igen.';
  } else if (state.awaitingContinue) {
    const handsEmpty = state.players.every(player => player.hand.length === 0);
    const oneCardLeft = state.players.every(player => player.hand.length === 1);
    els.turnTitle.textContent = handsEmpty ? 'Runden er færdig' : oneCardLeft ? 'Sidste kort tilbage' : 'Pause';
    els.turnHint.textContent = handsEmpty ? 'Tryk Næste runde.' : oneCardLeft ? 'Tryk Fortsæt for at spille sidste kort.' : 'Tryk Fortsæt.';
  } else {
    const player = currentPlayer();
    els.turnTitle.textContent = `${player.name}s tur`;
    els.turnHint.textContent = turnHintFor(player);
  }

  els.currentTopCard.textContent = state.topCardValue === null ? '-' : valueName(state.topCardValue);
  renderPile();
  renderFinalReveal();
  renderRoundResult();
}

function renderPile() {
  els.pileZone.innerHTML = '';

  const visual = document.createElement('div');
  visual.className = 'pile-visual';

  if (state.pileCards.length === 0) {
    const placeholder = document.createElement('div');
    placeholder.className = 'card-back empty-pile-card';
    visual.appendChild(placeholder);
    els.pileZone.appendChild(visual);
    return;
  }

  const cardsToShow = state.pileCards.slice(-5);
  const offsets = [
    { x: -30, y: -8, r: -9 },
    { x: -16, y: -2, r: -5 },
    { x: 0, y: 3, r: 0 },
    { x: 16, y: 8, r: 5 },
    { x: 30, y: 13, r: 9 },
  ];
  const startOffset = offsets.length - cardsToShow.length;

  cardsToShow.forEach((entry, index) => {
    const offset = offsets[startOffset + index];
    const wrap = document.createElement('div');
    const isTop = index === cardsToShow.length - 1;
    wrap.className = `pile-card-wrap ${isTop ? 'top' : ''}`;
    wrap.style.transform = `translate(calc(-50% + ${offset.x}px), calc(-50% + ${offset.y}px)) rotate(${offset.r}deg)`;
    wrap.style.zIndex = String(index + 1);
    wrap.appendChild(isTop ? renderCard(entry.card) : renderCardBack());
    visual.appendChild(wrap);
  });

  els.pileZone.appendChild(visual);
}

function renderFinalReveal() {
  const show = state.lastRoundResult && state.awaitingContinue && state.players.every(player => player.hand.length === 0);
  els.finalReveal.classList.toggle('hidden', !show);
  els.finalReveal.innerHTML = '';
  if (!show) return;

  const loserIds = new Set(state.lastRoundResult.loserIds);
  for (const entry of state.lastRoundResult.finalEntries) {
    const slot = document.createElement('div');
    slot.className = `final-card-slot ${finalClassForPlayerId(entry.playerId)} ${loserIds.has(entry.playerId) ? 'loser' : ''}`;
    slot.appendChild(renderCard(entry.card));
    const label = document.createElement('span');
    label.className = 'final-name';
    label.textContent = playerName(entry.playerId);
    slot.appendChild(label);
    els.finalReveal.appendChild(slot);
  }
}

function renderRoundResult() {
  const show = state.lastRoundResult && state.awaitingContinue && state.players.every(player => player.hand.length === 0);
  els.roundResult.classList.toggle('hidden', !show);
  els.roundResult.innerHTML = '';
  if (!show) return;

  const result = state.lastRoundResult;
  els.roundResult.innerHTML = `
    <span>${escapeHtml(result.loserNames)} tabte med ${escapeHtml(valueName(result.highestValue))}</span>
    <strong>${result.nextCards} kort til hver spiller</strong>
    <span>${result.capped ? 'Taberkortet var over 10, så loftet på 10 bruges.' : 'Taberkortet bestemmer næste rundes kortantal.'}</span>
  `;
}

function renderHand() {
  const player = currentPlayer();
  els.handCards.innerHTML = '';

  if (!player || state.gameOver) {
    els.handTitle.textContent = 'Hånd';
    els.handCount.textContent = '';
    return;
  }

  els.handTitle.textContent = player.type === 'ai' ? `${player.name}s hånd` : `${player.name}s hånd`;
  els.handCount.textContent = `${player.hand.length} kort`;

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
    reason.textContent = playableIds.has(card.id) && !state.awaitingContinue && player.type !== 'ai' ? 'Kan spilles' : '';
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
  if (state.players.every(player => player.hand.length === 0)) return 'Næste runde';
  if (state.players.every(player => player.hand.length === 1)) return 'Spil sidste kort';
  return 'Fortsæt';
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

function renderCardBack() {
  const div = document.createElement('div');
  div.className = 'card-back';
  return div;
}

function turnHintFor(player) {
  if (state.topCardValue === null) return 'Du starter bunken. Vælg et kort.';

  const canBeatTopCard = player.hand.some(card => card.value >= state.topCardValue);
  if (canBeatTopCard) return `Du skal lægge ${valueName(state.topCardValue)} eller højere.`;
  return `Du kan ikke matche/stikke ${valueName(state.topCardValue)} og skal smide dit laveste kort.`;
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

function addLog(text, important = false) {
  const div = document.createElement('div');
  div.className = `log-entry ${important ? 'important' : ''}`;
  div.textContent = text;
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

function setSound(value) {
  state.soundEnabled = value === 'on';
  els.soundSetting.value = value;
  els.soundSettingGame.value = value;
}

function setCardBack(value) {
  state.cardBack = value;
  document.body.dataset.cardBack = value;
  els.cardBackSelect.value = value;
  els.cardBackSelectGame.value = value;
}

function setFelt(value) {
  state.felt = value;
  document.body.dataset.felt = value;
  els.feltSelect.value = value;
  els.feltSelectGame.value = value;
}

function syncAppearanceFromControls() {
  setSound(els.soundSetting.value);
  setCardBack(els.cardBackSelect.value);
  setFelt(els.feltSelect.value);
}

function ensureAudioContext() {
  if (!state.soundEnabled) return null;
  const AudioCtor = window.AudioContext || window.webkitAudioContext;
  if (!AudioCtor) return null;
  if (!audioContext) audioContext = new AudioCtor();
  if (audioContext.state === 'suspended') audioContext.resume();
  return audioContext;
}

function playCardSound() {
  const ctx = ensureAudioContext();
  if (!ctx) return;
  const now = ctx.currentTime;

  const noise = ctx.createBufferSource();
  const buffer = ctx.createBuffer(1, Math.floor(ctx.sampleRate * 0.045), ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / data.length);
  noise.buffer = buffer;

  const filter = ctx.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.setValueAtTime(950, now);
  filter.Q.setValueAtTime(1.8, now);

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(0.13, now + 0.006);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.055);

  noise.connect(filter).connect(gain).connect(ctx.destination);
  noise.start(now);
  noise.stop(now + 0.06);
}

function playDealSound() {
  const ctx = ensureAudioContext();
  if (!ctx) return;
  const ticks = Math.min(state.players.length * state.cardsPerPlayer, 14);
  for (let i = 0; i < ticks; i++) {
    window.setTimeout(playSoftDealTick, i * 42);
  }
}

function playSoftDealTick() {
  const ctx = ensureAudioContext();
  if (!ctx) return;
  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'triangle';
  osc.frequency.setValueAtTime(380 + Math.random() * 90, now);
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(0.055, now + 0.004);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.045);
  osc.connect(gain).connect(ctx.destination);
  osc.start(now);
  osc.stop(now + 0.05);
}

init();
