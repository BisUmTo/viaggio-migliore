# Il viaggio migliore
Laboratorio italiano sul problema del commesso viaggiatore, per la 4ª Liceo.

Gioca: https://bisumto.github.io/viaggio-migliore/

Apri `index.html` nel browser: nessuna installazione o account. Tutti gli asset e i font sono locali, quindi il gioco funziona anche offline dopo aver scaricato la cartella completa. Per GitHub Pages: radice del branch `main`.

## I viaggi
Italia, Europa e Terre di Lumen, un mondo fantastico originale. Italia e Lumen hanno otto tappe; Europa ne ha dieci, con Francoforte e Zurigo al centro. I tentativi della precedente Europa a otto città restano nel taccuino, distinti dalla nuova versione. Le tre sfide didattiche originali (Esplorazione, Scambio, Sfida) mantengono coordinate e soluzioni: restano coerenti con guida e slide della lezione del 26 novembre 2026.

Si parte da A, si visita ogni città una volta e si torna automaticamente ad A. Le distanze sono euclidee, in unità della mappa. Sulle carte geografiche si usa la proiezione indicata nei crediti: **non sono chilometri né tragitti stradali**. Sulla carta fantasy rilievi e fiumi sono ambientazione, non ostacoli.

## Attività in gruppo
- Inventare un giro, scrivere una regola ripetibile nel Taccuino e salvare il tentativo.
- Scambiare la regola con un altro gruppo e provare a migliorare il risultato.
- Confrontare con l’ottimo quando il docente dà il via.
- Usare Sfida per cercare un controesempio alla regola della città più vicina.

Note, giri correnti per ogni mappa e ultimi 100 tentativi restano in localStorage. Il Taccuino conserva la strategia di ogni tentativo e distingue il lavoro precedente/successivo alla visualizzazione dell’ottimo. Scaricare la scheda per consegnarla; il testo completo è anche disponibile da copiare dopo il comando di esportazione. Nessun dato del gruppo viene inviato dall’app; l’hosting riceve le normali richieste HTTP.

## Accessibilità e confronto
Mouse, tastiera (Tab + Invio/Spazio), selezione da elenco su schermi piccoli. Il confronto è disponibile dopo un giro completo e una conferma, non è un controllo di accesso. Il docente regola quando aprirlo. Il solver esatto è Held–Karp e arrotonda soltanto i valori visualizzati.

## Verifica
`node core.test.cjs`: confronto tra solver ed enumerazione completa su tutte le mappe e otto casi di controllo, validazione bozze, asset e regressione sui risultati originali. `node --check app.js`: sintassi. Nessuna dipendenza di build.

## Crediti
Ispirazione didattica: [TSP della TU München](https://algorithms.discrete.ma.tum.de/graph-games/tsp-game/index_en.html). Nessun codice o asset TUM copiato. Interfaccia originale, direzione da atlante editoriale. Dati geografici Natural Earth in pubblico dominio; font con licenza SIL OFL; illustrazione fantasy originale generata con ImageGen. Dettagli in [assets/ATTRIBUTION.md](assets/ATTRIBUTION.md).

## Sei sfide avanzate

In un gruppo separato dell’atlante: L’ultimo salto (greedy), Senza incroci (ordine visivo insufficiente), Gemelli prima/dopo (una sola città si sposta), Il certificato sospetto (ottimo locale 2-opt non globale), Quattordici tappe (ricerca a tempo). Ogni consegna include due indizi facoltativi e dati copiabili; quattro mappe offrono un giro iniziale da battere. La sfida sul certificato permette di verificare anche risposte AI, senza affermare che un modello specifico fallisca.

`challenges.js` aggiunge il catalogo senza modificare le sei mappe precedenti. I test confrontano le istanze grandi anche con `exact-check.cjs`, un verificatore indipendente branch-and-bound con limite inferiore basato su MST. Tutte le proprietà didattiche dichiarate hanno controlli automatici, incluse le mosse 2-opt e il cambio di ottimo tra i gemelli.

## Per chi vuole di più: tre prove di eccellenza

Sezione separata, con consegne, due indizi facoltativi e dati copiabili:
- **Quattordici false partenze** (20–30 min): il migliore dei 14 giri greedy, uno per ogni partenza, è comunque oltre l’11% più lungo dell’ottimo.
- **La fortezza locale** (25–35 min): nessun cambiamento di fino a tre archi migliora il giro proposto, che supera comunque l’ottimo del 2,7%. Occorre una riorganizzazione più ampia; adatta anche a verificare criticamente una giustificazione AI.
- **Il giro e la prova** (15–25 min): griglia di 12 città; costruire un ciclo e dimostrarne l’ottimalità con un limite inferiore.

`node expert.test.cjs` verifica tutte le partenze greedy, tutte le ricongiunzioni dopo tre tagli e il limite inferiore della griglia. `node core.test.cjs` controlla anche gli ottimi con un risolutore indipendente. Non sono benchmark sulle prestazioni di modelli AI.
