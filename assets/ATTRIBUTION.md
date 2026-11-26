# Mappe e caratteri

## Cartografia geografica

`italia.svg` ed `europa.svg` sono elaborazioni originali dei dati Natural Earth, scala 1:110 milioni, Admin 0 Countries, scaricati il 26 novembre 2026.

- Dati: https://github.com/nvkelso/natural-earth-vector/blob/master/geojson/ne_110m_admin_0_countries.geojson
- Licenza: pubblico dominio. https://www.naturalearthdata.com/about/terms-of-use/
- Proiezione equirettangolare con parallelo di riferimento 41,5° (Italia) e 48° (Europa).
- Le coordinate delle città sono approssimazioni del centro urbano. I confini e le coste sono generalizzati alla scala del dataset.
- Le distanze del gioco sono euclidee nella mappa proiettata: non sono distanze stradali né chilometri geodetici.
- `maps-data.json` conserva coordinate geografiche, coordinate SVG, punti del modello di gioco e parametri di proiezione. SVG di 720 × 520, con scala uniforme nel rendering.

## Caratteri locali

Google Fonts, distribuzione ufficiale via fonts.googleapis.com e fonts.gstatic.com, scaricati il 26 novembre 2026.

- DM Sans, latino, variabile peso 400–700: `dm-sans-latin.woff2`; licenza SIL Open Font License 1.1 in `DM-Sans-OFL.txt`. https://github.com/google/fonts/tree/main/ofl/dmsans
- Fraunces, latino, variabile peso 400–700: `fraunces-latin.woff2`; licenza SIL Open Font License 1.1 in `Fraunces-OFL.txt`. https://github.com/google/fonts/tree/main/ofl/fraunces

I file sono serviti dal sito stesso; non occorrono richieste a Google Fonts durante l’uso.

## Terre di Lumen

`lumen.png`: illustrazione cartografica originale generata con ImageGen il 26 novembre 2026 per questo laboratorio. Mondo immaginario, senza corrispondenza con opere o geografie ufficiali. I nomi dei borghi e i percorsi sono elementi interattivi separati dall’immagine. Rilievi e fiumi sono ambientazione: la metrica resta euclidea.

## Fondi con rilievo

`italia-relief.png` ed `europa-relief.png` sono ritagli riproiettati del raster Natural Earth II 1:50m, Shaded Relief and Water, versione 3.2.0, pubblico dominio. Rappresentano terreno e copertura del suolo idealizzati, non fotografie satellitari.

- Fonte ufficiale: https://www.naturalearthdata.com/downloads/50m-raster-data/50m-natural-earth-2/
- Archivio: https://naciscdn.org/naturalearth/50m/raster/NE2_50M_SR_W.zip
- Raster originale 10800 × 5400, coordinate geografiche globali WGS84, passo 1/30 di grado.
- Esportazione 1440 × 1040, corrispondente esattamente al viewBox 720 × 520 e ai parametri in `maps-data.json`. Ricampionamento bicubico, nessun territorio inventato o generato.
