# Serviceproviders-onderzoek – website

Losse wervingspagina voor het Serviceproviders-onderzoek van DFO Onderzoek, bedoeld voor GitHub Pages. Gebaseerd op de pagina van het Performance-onderzoek.

## Bestanden

| Bestand | Wat het is | Aanpassen? |
|---|---|---|
| `data.js` | Alle teksten, cijfers, winnaars, vragen en de link naar de vragenlijst | **Ja, alleen dit bestand** |
| `index.html` | Opbouw van de pagina | Zelden |
| `style.css` | Opmaak in de huisstijl van DFO Onderzoek (#005EA9, #6EC1E4, Arial) | Zelden |
| `app.js` | Vult de pagina met de gegevens uit `data.js` | Nee |
| `assets/` | Logo en favicon | Alleen bij nieuw logo |
| `samenvattingen/` | Pdf's van de samenvattingen die nog niet elders online staan | Bij een nieuwe samenvatting |
| `versie-b/` | Variant met een andere opbouw (uitkomst eerst, kiezen per markt). Gebruikt dezelfde `data.js` en `assets/` | Nee |

Versie A staat op `.../serviceproviders-onderzoek/`, versie B op `.../serviceproviders-onderzoek/versie-b/`.

## Voor livegang

1. Vul in `data.js` de echte gegevens in: link naar de vragenlijst (Crowdtech), sluitdatum, welke meting open is en eventueel de voorbereidingslink.
2. Zet `voorbeeld: false` in `data.js`, dan verdwijnt de gele balk.
3. Vervang in `index.html` (en `versie-b/index.html`) de link `#privacy-link-volgt` door de link naar de privacyverklaring.
4. Net als bij Performance staat er geen voortgang of stand per markt op de pagina.

## Afspraken over de inhoud

- Uit de samenvattingen (vertrouwelijk) alleen de top 3 en de hoofdlijnen overnemen. Geen scores per serviceprovider en niets over de laagst beoordeelde partijen.
- De vakpaper is "aangeboden door de deelnemende serviceproviders". Nooit schrijven dat er geen betaalde plek is.
- Eerlijke tijden: mediaan 2026 meting 1 9,1 minuten, meting 2 6,2 minuten. De voorbereidingslink scheelt ongeveer 1½ à 2 minuten per meting en kost zelf één keer per jaar ongeveer 6 minuten.

## Bijwerken

Alles staat in `data.js`: de huidige meting (`metingen`, `vragenlijstUrl`, `sluitdatum`), de grafieken (`inzichten`, alleen openbare cijfers per markt), de eerdere resultaten met downloadlinks (`vorigeJaren`), de artikelen in de vakpers (`impact.vakpers`) en de berichten van winnaars (`impact.aanbiedersOver`). Na de sluitdatum veranderen de knoppen automatisch in "Bekijk de resultaten".

## Een samenvatting toevoegen

1. Geef de pdf een korte naam, bijvoorbeeld `2026-meting-2.pdf` (lange namen geven problemen in Windows).
2. Upload hem op GitHub in de map `samenvattingen/`.
3. Zet in `data.js` bij de juiste meting `samenvattingUrl: "samenvattingen/2026-meting-2.pdf"`.

## Online zetten via GitHub Pages

1. Upload de inhoud van deze map naar de hoofdmap van de repository.
2. Ga naar **Settings > Pages**, kies bij **Source** "Deploy from a branch", branch `main`, map `/ (root)` en klik op **Save**.
3. Na een paar minuten staat de pagina op `https://<gebruikersnaam>.github.io/serviceproviders-onderzoek/`.
