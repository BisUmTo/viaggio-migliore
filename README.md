# Il viaggio migliore
Laboratorio originale in italiano per la 4ª Liceo, 26 novembre 2026.

Apri `index.html` nel browser: non richiede installazioni né account. Tutti i file necessari sono inclusi; funziona anche offline. Per GitHub Pages: pubblicare la radice del branch `main`.

## Attività
Tre mappe fisse: Esplorazione, Scambio, Sfida. Partenza A, visita una volta ogni città e ritorno automatico. Le distanze sono euclidee, in unità della mappa. I tentativi salvati e le note restano in localStorage. La scheda si scarica in formato testo. Nessun dato del gruppo viene inviato dall’app; il servizio di hosting riceve le normali richieste HTTP.

Il confronto esatto è disponibile dopo aver completato un giro. Non è un controllo di accesso: il docente regola quando aprirlo. L’app usa Held–Karp sulle piccole mappe e arrotonda soltanto la visualizzazione. Include più giri ottimi possibili, trattati con tolleranza numerica.

## Verifica
`node core.test.cjs` confronta il solver con l’enumerazione di tutti i percorsi, valida le mappe e il controesempio. `node --check app.js` verifica la sintassi.

## Crediti
Ispirazione didattica: gioco TSP della TU München, https://algorithms.discrete.ma.tum.de/graph-games/tsp-game/index_en.html . Codice, mappe, interfaccia e testi di questa versione sono originali. Nessun codice o asset TUM è stato copiato.
