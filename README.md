# PDF's samenvoegen en lege pagina's verwijderen

**Link:** https://lynx-kvm.github.io/merge_and_clean_pdf/

## Online versie

De online versie staat momenteel publiek beschikbaar op mijn persoonlijke GitHub-account. Deze versie kan in de toekomst nog aangepast worden of eventueel offline gaan.

Daarom staat er ook een **lokale, stabiele versie van de tool in `index.html`**. Deze versie is bedoeld als vaste kopie en zal niet wijzigen.

Als je deze tool ook intern online beschikbaar wilt maken, kan je hiervoor contact opnemen met IT.

## De lokale versie openen

1. Ga naar het bestand `index.html`.
2. Klik met de rechtermuisknop op het bestand.
3. Kies **Openen met**.
4. Kies **Microsoft Edge** of **Google Chrome**.

## Wat doet de tool?

De tool is gemaakt om meerdere PDF-bestanden samen te voegen en daarbij automatisch pagina's te detecteren die vermoedelijk leeg zijn. Zo hoeft dit niet meer volledig handmatig te gebeuren.

## Gebruik

1. **Selecteer de PDF-bestanden** die je wilt samenvoegen.
2. Controleer de **volgorde van de bestanden** en pas deze indien nodig aan met de pijltjes.
3. Klik op **"PDF's laden & lege pagina's zoeken"**.
4. De tool scant alle pagina's en probeert automatisch lege pagina's te herkennen.
5. **Controleer de gevonden pagina's.** Pagina's met een rode rand worden standaard uitgesloten.
6. Klik op een pagina om deze alsnog te **behouden** of juist **uit te sluiten**.
7. Klik op **"Geselecteerde pagina's samenvoegen & downloaden"** om de nieuwe PDF te maken.

## Privacy

De PDF-bestanden worden **volledig in de browser verwerkt**. De bestanden worden niet naar een server geüpload.

## Belangrijk

De detectie van lege pagina's gebeurt automatisch en is gebaseerd op de inhoud van de pagina. Controleer daarom altijd de voorgestelde selectie voordat je de definitieve PDF maakt.

De tool is bedoeld om het handmatige werk te verminderen, niet om de controle volledig over te nemen.

## Technische informatie

De tool maakt gebruik van **PDF.js** en **pdf-lib**. Deze bibliotheken worden in de online versie via een CDN geladen.

De lokale `index.html` bevat de huidige werkende versie van de tool.
