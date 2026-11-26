(function(root){
'use strict';
const challenges=[
  {
    "id": "ultimo-salto",
    "name": "L’ultimo salto",
    "title": "L’ultimo salto",
    "category": "advanced",
    "points": [
      [
        73,
        85
      ],
      [
        47,
        22
      ],
      [
        63,
        60
      ],
      [
        92,
        19
      ],
      [
        34,
        23
      ],
      [
        59,
        27
      ],
      [
        50,
        84
      ],
      [
        56,
        42
      ],
      [
        90,
        78
      ],
      [
        35,
        37
      ]
    ],
    "baseline": [
      0,
      8,
      2,
      7,
      5,
      1,
      4,
      9,
      6,
      3
    ],
    "description": "La città più vicina può lasciarti un conto salato alla fine.",
    "challenge": {
      "level": "Avanzata",
      "minutes": "8–12 min",
      "mission": "Il giro proposto sceglie sempre la città non visitata più vicina. Battilo, poi individua la scelta che rende costoso il ritorno. Scrivi una regola diversa e spiega se garantisce davvero l’ottimo.",
      "hints": [
        "Osserva il tratto che chiude il giro: quando hai deciso di renderlo così lungo?",
        "Prima di scegliere una tappa, considera anche quali città resteranno isolate."
      ]
    }
  },
  {
    "id": "senza-incroci",
    "name": "Senza incroci",
    "title": "Senza incroci",
    "category": "advanced",
    "points": [
      [
        23,
        33
      ],
      [
        7,
        21
      ],
      [
        12,
        40
      ],
      [
        26,
        66
      ],
      [
        92,
        62
      ],
      [
        38,
        31
      ],
      [
        57,
        78
      ],
      [
        60,
        62
      ],
      [
        51,
        53
      ],
      [
        30,
        46
      ],
      [
        75,
        83
      ]
    ],
    "baseline": [
      0,
      5,
      8,
      4,
      7,
      10,
      6,
      3,
      2,
      9,
      1
    ],
    "description": "Un percorso ordinato può nascondere molta strada inutile.",
    "challenge": {
      "level": "Avanzata",
      "minutes": "10–15 min",
      "mission": "Il giro proposto non ha incroci. È quindi ottimo? Trova un giro più corto senza affidarti al pulsante di confronto. Annota almeno uno scambio che lo migliora.",
      "hints": [
        "Non cercare solo incroci: confronta anche due collegamenti lunghi e separati.",
        "Per scambiare due archi e mantenere un solo giro, puoi invertire l’ordine di un tratto del percorso."
      ]
    }
  },
  {
    "id": "gemelli-prima",
    "name": "Gemelli · prima",
    "title": "Gemelli · prima",
    "category": "advanced",
    "points": [
      [
        16,
        61
      ],
      [
        55,
        76
      ],
      [
        63,
        12
      ],
      [
        42,
        21
      ],
      [
        74,
        32
      ],
      [
        43,
        33
      ],
      [
        66,
        84
      ],
      [
        25,
        30
      ],
      [
        23,
        14
      ]
    ],
    "description": "La prima metà di un esperimento: cambia una sola città.",
    "challenge": {
      "level": "Avanzata",
      "minutes": "8–12 min",
      "mission": "Cerca un ottimo e salva il tentativo. Poi apri «Gemelli · dopo»: otto città restano identiche, si sposta soltanto I. Il tuo ordine continuerà a essere il migliore?",
      "hints": [
        "Scrivi l’ordine completo prima di cambiare mappa.",
        "Per confrontare due percorsi, usa le distanze della stessa mappa."
      ]
    }
  },
  {
    "id": "gemelli-dopo",
    "name": "Gemelli · dopo",
    "title": "Gemelli · dopo",
    "category": "advanced",
    "points": [
      [
        16,
        61
      ],
      [
        55,
        76
      ],
      [
        63,
        12
      ],
      [
        42,
        21
      ],
      [
        74,
        32
      ],
      [
        43,
        33
      ],
      [
        66,
        84
      ],
      [
        25,
        30
      ],
      [
        35,
        9
      ]
    ],
    "description": "Stesse lettere, una posizione diversa: riesamina la tua certezza.",
    "challenge": {
      "level": "Avanzata",
      "minutes": "8–12 min",
      "mission": "Riprendi l’ordine salvato in «Gemelli · prima» e provalo qui. Puoi migliorarlo cambiando poche tappe? Spiega perché il successo sulla prima mappa non certifica la tua regola.",
      "hints": [
        "La città I si è spostata. Controlla i suoi due vicini e le città immediatamente intorno.",
        "Puoi copiare l’ordine dal taccuino e ripeterlo qui; il confronto esatto è separato per ogni mappa."
      ]
    }
  },
  {
    "id": "certificato",
    "name": "Il certificato sospetto",
    "title": "Il certificato sospetto",
    "category": "advanced",
    "points": [
      [
        44,
        40
      ],
      [
        80,
        10
      ],
      [
        68,
        86
      ],
      [
        33,
        73
      ],
      [
        18,
        10
      ],
      [
        48,
        10
      ],
      [
        61,
        34
      ],
      [
        36,
        10
      ],
      [
        73,
        73
      ],
      [
        84,
        48
      ]
    ],
    "baseline": [
      0,
      6,
      1,
      9,
      8,
      2,
      3,
      4,
      7,
      5
    ],
    "description": "Una risposta convincente non è ancora una dimostrazione.",
    "challenge": {
      "level": "Esperta",
      "minutes": "15–20 min",
      "mission": "Un assistente sostiene: «Nessuno scambio di due archi accorcia questo giro, dunque è ottimo». Verifica la conclusione: confermala con una prova oppure smentiscila con un giro più corto. Puoi copiare i dati e chiedere a un’AI di motivare la risposta; poi controlla il suo percorso.",
      "hints": [
        "Non confondere «nessun miglioramento di questo tipo» con «nessun miglioramento possibile».",
        "Prova a cambiare contemporaneamente tre collegamenti. Un passo peggiorativo può anche aprire la strada a un miglioramento successivo."
      ]
    }
  },
  {
    "id": "quattordici",
    "name": "Quattordici tappe",
    "title": "Quattordici tappe",
    "category": "advanced",
    "points": [
      [
        10,
        23
      ],
      [
        9,
        38
      ],
      [
        31,
        60
      ],
      [
        8,
        69
      ],
      [
        87,
        25
      ],
      [
        87,
        77
      ],
      [
        28,
        73
      ],
      [
        58,
        68
      ],
      [
        74,
        11
      ],
      [
        63,
        88
      ],
      [
        50,
        56
      ],
      [
        40,
        13
      ],
      [
        90,
        62
      ],
      [
        74,
        79
      ]
    ],
    "baseline": [
      0,
      1,
      3,
      6,
      2,
      10,
      7,
      13,
      5,
      12,
      4,
      8,
      11,
      9
    ],
    "description": "Oltre tre miliardi di giri possibili. Da dove cominci?",
    "challenge": {
      "level": "Esperta",
      "minutes": "15–25 min",
      "mission": "Avete dieci minuti: migliorate il giro proposto e salvate almeno tre tentativi con strategie diverse. Poi scegliete il migliore. Prima del confronto, dichiarate se pensate sia ottimo e su quali prove vi basate.",
      "hints": [
        "Separate il tempo speso per cercare dalla lunghezza del giro trovato.",
        "Provate a costruire il bordo esterno e inserire le città interne; poi confrontate con un’altra strategia."
      ]
    }
  }
];
if(typeof module!=='undefined'&&module.exports)module.exports=challenges;else root.TSP.maps.push(...challenges);
})(typeof globalThis!=='undefined'?globalThis:this);
