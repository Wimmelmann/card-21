<!doctype html>
<html lang="da">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>21 / Agurk</title>
  <link rel="stylesheet" href="styles.css" />
</head>
<body data-card-back="red" data-felt="green">
  <div class="app-shell">
    <header class="hero">
      <div>
        <p class="eyebrow">Kortspil</p>
        <h1>21 / Agurk</h1>
        <p class="subtitle">Spil lokalt mod venner eller computer-spillere.</p>
      </div>
      <button id="rulesBtn" class="ghost-btn">Regler</button>
    </header>

    <main>
      <section id="setupView" class="panel setup-panel">
        <div class="setup-head">
          <div>
            <h2>Start nyt spil</h2>
            <p class="hint">Første runde starter med 7 kort. Herefter styrer taberkortet næste runde, max 10 kort.</p>
          </div>
          <div class="card-back-preview" aria-hidden="true"></div>
        </div>

        <div class="setup-grid">
          <label>
            Antal spillere
            <select id="playerCount">
              <option value="2">2 spillere</option>
              <option value="3">3 spillere</option>
              <option value="4" selected>4 spillere</option>
            </select>
          </label>
          <label>
            Pointregel
            <select id="pointLimit">
              <option value="21" selected>Over 21 taber · præcis 21 nulstiller</option>
            </select>
          </label>
        </div>

        <div id="playerSetup" class="player-setup"></div>

        <h3>Udseende og lyd</h3>
        <div class="setup-grid options-grid">
          <label>
            Lyd
            <select id="soundSetting">
              <option value="on" selected>Til</option>
              <option value="off">Fra</option>
            </select>
          </label>
          <label>
            Kortbagside
            <select id="cardBackSelect">
              <option value="red" selected>Klassisk rød</option>
              <option value="blue">Blå</option>
              <option value="blackGold">Sort/guld</option>
              <option value="green">Grøn</option>
            </select>
          </label>
          <label>
            Filttæppe
            <select id="feltSelect">
              <option value="green" selected>Mørkegrøn</option>
              <option value="blue">Blå</option>
              <option value="bordeaux">Bordeaux</option>
              <option value="black">Sort</option>
            </select>
          </label>
        </div>

        <button id="startGameBtn" class="primary-btn wide">Start spil</button>
      </section>

      <section id="gameView" class="game-view hidden">
        <section class="table-wrap panel">
          <div class="table-toolbar">
            <div>
              <p id="roundLabel" class="eyebrow">Runde 1</p>
              <h2 id="turnTitle">Din tur</h2>
              <p id="turnHint" class="hint">Vælg et kort.</p>
            </div>
            <div class="toolbar-actions">
              <button id="settingsBtn" class="ghost-btn small">Indstillinger</button>
              <button id="newGameBtn" class="ghost-btn small">Nyt spil</button>
            </div>
          </div>

          <div id="tableBoard" class="table-board">
            <div id="seatLayer" class="seat-layer"></div>

            <div class="center-readout">
              <span>Øverste kort</span>
              <strong id="currentTopCard">-</strong>
            </div>

            <div id="pileZone" class="pile-zone"></div>
            <div id="finalReveal" class="final-reveal hidden"></div>
            <div id="roundResult" class="round-result hidden"></div>
          </div>

          <div class="hand-area">
            <div class="hand-title-row">
              <h3 id="handTitle">Din hånd</h3>
              <span id="handCount" class="pill"></span>
            </div>
            <div id="handCards" class="hand-cards"></div>
          </div>

          <div class="controls">
            <button id="autoPlayBtn" class="secondary-btn">Spil anbefalet kort</button>
            <button id="continueBtn" class="primary-btn hidden">Fortsæt</button>
          </div>
        </section>

        <aside class="side-panel">
          <section class="panel status-panel">
            <h2>Spilstatus</h2>
            <div class="status-list">
              <div><span>Denne runde</span><strong id="cardsThisRound">7 kort</strong></div>
              <div><span>Næste runde</span><strong id="nextRoundInfo">—</strong></div>
              <div><span>Bunken</span><strong id="pileCount">0 kort</strong></div>
            </div>
          </section>

          <section id="settingsPanel" class="panel settings-panel hidden">
            <h2>Indstillinger</h2>
            <label>
              Lyd
              <select id="soundSettingGame">
                <option value="on">Til</option>
                <option value="off">Fra</option>
              </select>
            </label>
            <label>
              Kortbagside
              <select id="cardBackSelectGame">
                <option value="red">Klassisk rød</option>
                <option value="blue">Blå</option>
                <option value="blackGold">Sort/guld</option>
                <option value="green">Grøn</option>
              </select>
            </label>
            <label>
              Filttæppe
              <select id="feltSelectGame">
                <option value="green">Mørkegrøn</option>
                <option value="blue">Blå</option>
                <option value="bordeaux">Bordeaux</option>
                <option value="black">Sort</option>
              </select>
            </label>
          </section>

          <section class="panel log-panel">
            <h2>Rundelog</h2>
            <p class="hint small-text">Almindelige spillede kort gemmes ikke i loggen. Det skal man selv huske.</p>
            <div id="logList" class="log-list"></div>
          </section>
        </aside>
      </section>
    </main>
  </div>

  <dialog id="rulesDialog">
    <div class="dialog-content">
      <button id="closeRulesBtn" class="close-btn">×</button>
      <h2>Regler i denne app</h2>
      <ul>
        <li>2–4 spillere. Kulør betyder ingenting.</li>
        <li>Es er lavest. Konge er højest.</li>
        <li>Første runde spilles med 7 kort til hver.</li>
        <li>Alle spiller i én bunke. Man skal lægge samme eller højere værdi end det øverste kort, hvis man kan.</li>
        <li>Kan man ikke matche eller stikke øverste kort, skal man smide sit laveste kort. Det kort bliver det nye øverste kort.</li>
        <li>En runde er hele hånden fra kortgivning til sidste kort – ikke kun én rundgang.</li>
        <li>Når alle sidder med ét kort til sidst, spilles sidste kort, og højeste sidste kort taber runden.</li>
        <li>Hvis flere har samme højeste sidste kort, taber de alle og beholder hver deres kort.</li>
        <li>Taberkortets fulde værdi gives som strafpoint.</li>
        <li>Næste runde får alle kort svarende til taberkortet, dog højst 10 kort.</li>
        <li>Det gælder om ikke at få point. Kommer en spiller over 21, er spillet slut.</li>
        <li>Rammer en spiller præcis 21, nulstilles pointbunken til 0.</li>
        <li>Taktik: lave kort er gode at gemme til sidst, men høje kort kan bruges til at presse næste spiller.</li>
      </ul>
    </div>
  </dialog>

  <script src="app.js"></script>
</body>
</html>
