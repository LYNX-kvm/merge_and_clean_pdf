# PDF'S SAMENVOEGEN EN LEGE PAGINA'S VERWIJDEREN

Online versie:
https://lynx-kvm.github.io/merge_and_clean_pdf/

Deze versie staat publiek online op mijn persoonlijke GitHub-account
en is bedoeld om de tool gemakkelijk te kunnen openen.

Omdat de online versie op mijn persoonlijke account staat, kan deze
in de toekomst wijzigen of niet meer beschikbaar zijn.

De huidige, vaste versie van de tool staat in het bestand "index.html"
en is bij deze bestanden inbegrepen. Deze versie blijft ongewijzigd.

Indien gewenst kan de tool ook intern online geplaatst worden.
Hiervoor kan contact worden opgenomen met IT.

---

1. LOKAAL OPENEN

---

Om de meegeleverde versie van de tool te gebruiken:

1. Zoek het bestand "index.html".
2. Klik met de rechtermuisknop op het bestand.
3. Kies "Openen met".
4. Kies Microsoft Edge of Google Chrome.

Er hoeft niets geïnstalleerd te worden.

---

2. WAT DOET DE TOOL?

---

De tool maakt het mogelijk om meerdere PDF-bestanden samen te voegen
en zoekt daarbij automatisch naar pagina's die vermoedelijk leeg zijn.

Dit bespaart tijd bij het handmatig controleren en verwijderen van
lege pagina's.

---

3. GEBRUIK

---

1. Open de tool.
2. Selecteer de PDF-bestanden die je wilt samenvoegen.
3. Controleer de volgorde van de bestanden en pas deze indien nodig
   aan met de pijltjes.
4. Klik op "PDF's laden & lege pagina's zoeken".
5. De tool scant de pagina's en markeert vermoedelijk lege pagina's
   automatisch.
6. Controleer de voorgestelde selectie.

   * Groene rand = pagina wordt behouden.
   * Rode rand = pagina wordt uitgesloten.
7. Klik op een pagina om deze handmatig in of uit te sluiten.
8. Wanneer alles gecontroleerd is, klik je op
   "Geselecteerde pagina's samenvoegen & downloaden".
9. De nieuwe PDF wordt automatisch gedownload.

---

4. PRIVACY

---

De PDF-bestanden worden volledig in de browser verwerkt.

De bestanden worden NIET naar een server geüpload.

De inhoud van de PDF's blijft dus op de computer waarop de tool
wordt gebruikt.

---

5. BELANGRIJK

---

De herkenning van lege pagina's gebeurt automatisch op basis van de
inhoud van de pagina.

De tool kan daarom niet met zekerheid bepalen of een pagina verwijderd
mag worden.

CONTROLEER ALTIJD DE VOORGESTELDE SELECTIE VOORDAT JE DE
DEFINITIEVE PDF MAAKT.

De tool is getest op verschillende documenten uit de huidige workflow
en heeft daarbij tot nu toe geen inhoudelijke pagina's foutief als
leeg aangeduid.

Toch blijft een laatste controle noodzakelijk.

---

6. TECHNISCHE INFORMATIE

---

De tool maakt gebruik van:

* PDF.js
  Voor het inlezen en analyseren van PDF-pagina's.

* pdf-lib
  Voor het samenvoegen en genereren van de uiteindelijke PDF.

De bibliotheken worden via een CDN geladen.

De tool werkt volledig aan de kant van de gebruiker (client-side)
en vereist geen installatie of aparte server.

---

7. BESTANDEN

---

index.html
De volledige, vaste versie van de tool.

```
Dit bestand kan rechtstreeks geopend worden in Edge of Chrome.
```

---

Bij problemen of vragen over de werking van de tool kan contact
worden opgenomen met IT.
