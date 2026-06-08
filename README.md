# 21 / Agurk

En GitHub-klar prototype af kortspillet **21**, også kendt som **Agurk**.

Version: v6

## Regler i appen

- 2–4 spillere.
- Første runde gives 7 kort til hver spiller.
- Es er lavest, konge er højest.
- Kulør har ingen betydning.
- Alle spillere lægger kort oven på hinanden i én bunke.
- Det er altid det **øverste kort**, der skal matches eller stikkes.
- Næste spiller skal lægge samme eller højere kort end øverste kort, hvis det er muligt.
- Kan spilleren ikke matche/stikke, skal spilleren smide sit laveste kort.
- Når en spiller smider et lavt kort, bliver det kort det nye øverste kort, og næste spiller skal kun matche/stikke det nye øverste kort.
- Eksempel: Spiller 1 lægger 8. Spiller 2 kan ikke stikke og lægger 2. Spiller 3 skal nu kun lægge 2 eller højere.
- En runde varer fra kortgivning til sidste kort – ikke kun én rundgang af spillere.
- Når alle sidder med ét kort tilbage, spilles sidste kort, og sidste kort afgør runden.
- Højeste sidste kort taber.
- Hvis flere spillere har samme højeste sidste kort, taber de alle og får strafpoint.
- Taberkortets fulde værdi gives som strafpoint.
- Taberkortets værdi bestemmer kortantal i næste runde, dog max 10 kort.
- Det gælder om **ikke** at få point.
- Kommer en spiller over 21 point, har spilleren tabt.
- Rammer en spiller præcis 21 point, nulstilles pointbunken til 0.

## Rettet i v6

- UI'et viser nu bunken som en egentlig kortstak i midten i stedet for en række kort.
- Teksten “Fælles bunke” er fjernet fra bordet, så det forklares visuelt i stedet.
- “Næste runde: Afgøres af taberkort” er fjernet.
- Næste rundes kortantal vises først tydeligt, når runden faktisk er afgjort.
- Efter en rundeslut vises et stort resultatfelt med fx “5 kort til hver spiller”.
- Scorepanelet viser “—” for næste runde, indtil kortantallet er kendt.

## Taktik i denne version

Den simple computer-AI forsøger at:

- beskytte esser meget hårdt og kun smide dem frivilligt, hvis der ikke er andre lovlige valg,
- gemme lave kort til slutningen,
- åbne bunken med mellem-kort frem for esser,
- komme af med farlige høje kort tæt på slutningen,
- bruge knægt/dame/konge til at presse næste spiller,
- spille laveste kort der kan matche/stikke, når der ikke er en god taktisk grund til at spille højere.

AI'en er stadig enkel og kan forbedres senere.

## Sådan kører du appen lokalt

Åbn `index.html` direkte i en browser.

## Sådan lægger du den på GitHub Pages

1. Opret et nyt repository på GitHub, fx `21-agurk`.
2. Upload disse filer:
   - `index.html`
   - `styles.css`
   - `app.js`
   - `README.md`
3. Gå til **Settings → Pages**.
4. Vælg branch `main` og folder `/root`.
5. Gem. Efter kort tid får du et link til appen.

## Næste mulige features

- Sværhedsgrader for AI.
- Bedre visning af hvorfor AI vælger et kort.
- Mobiloptimeret kort-animation.
- Gem spil i browseren.
- Online multiplayer med gamecode.
- Lyd og vibration ved vigtige spilhandlinger.
