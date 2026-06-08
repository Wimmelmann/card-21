# 21 / Agurk

En GitHub-klar prototype af kortspillet **21**, også kendt som **Agurk**.

## Regler i appen

- 2–4 spillere.
- Første runde gives 7 kort til hver spiller.
- Es er lavest, konge er højest.
- Kulør har ingen betydning.
- Næste spiller skal lægge samme eller højere kort, hvis muligt.
- Kan spilleren ikke stikke, skal spilleren smide sit laveste kort.
- Når alle sidder med ét kort tilbage, afgør sidste kort runden.
- Højeste sidste kort taber.
- Hvis flere spillere har samme højeste sidste kort, taber de alle og får strafpoint.
- Taberkortets fulde værdi gives som strafpoint.
- Taberkortets værdi bestemmer kortantal i næste runde, dog max 10 kort.
- Det gælder om **ikke** at få point.
- Kommer en spiller over 21 point, har spilleren tabt.
- Rammer en spiller præcis 21 point, nulstilles pointbunken til 0.

## Taktik i denne version

Den simple computer-AI spiller ikke længere kun laveste lovlige kort. Den forsøger nu også at:

- gemme lave kort til slutningen,
- komme af med farlige høje kort tæt på slutningen,
- bruge knægt/dame/konge til at presse næste spiller,
- spille laveste kort der kan stikke, når der ikke er en god taktisk grund til at spille højere.

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
