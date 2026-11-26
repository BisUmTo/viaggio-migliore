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
  },
{
  "id": "false-partenze",
  "name": "Quattordici false partenze",
  "title": "Quattordici false partenze",
  "category": "expert",
  "points": [
    [
      11,
      24
    ],
    [
      28,
      58
    ],
    [
      66,
      27
    ],
    [
      89,
      24
    ],
    [
      74,
      33
    ],
    [
      10,
      72
    ],
    [
      10,
      56
    ],
    [
      27,
      91
    ],
    [
      76,
      55
    ],
    [
      49,
      32
    ],
    [
      40,
      33
    ],
    [
      57,
      54
    ],
    [
      19,
      45
    ],
    [
      49,
      66
    ]
  ],
  "description": "Cambiare partenza non basta a rendere esatta una regola.",
  "challenge": {
    "level": "Eccellenza",
    "minutes": "20–30 min",
    "mission": "Il giro proposto è il migliore tra 14 tentativi: da ciascuna città si sceglie sempre la non visitata più vicina. Battetelo e spiegate perché provare tutte le partenze non equivale a provare tutti i giri. Consegnate un percorso, la sua lunghezza e un controesempio alla pretesa di ottimalità.",
    "hints": [
      "Il migliore tra pochi candidati non è necessariamente il migliore tra tutti. Cercate collegamenti costosi che restano in ciascuna costruzione greedy.",
      "Per ripetere l’esperimento, a parità di distanza scegliete la lettera precedente. Dopo aver costruito ogni ciclo, riscrivetelo partendo da A: la lunghezza non cambia."
    ]
  },
  "baseline": [
    0,
    10,
    9,
    2,
    4,
    3,
    8,
    11,
    13,
    1,
    12,
    6,
    5,
    7
  ]
},
{
  "id": "fortezza",
  "name": "La fortezza locale",
  "title": "La fortezza locale",
  "category": "expert",
  "points": [
    [
      41,
      14
    ],
    [
      83,
      78
    ],
    [
      56,
      80
    ],
    [
      28,
      59
    ],
    [
      38,
      46
    ],
    [
      32,
      16
    ],
    [
      49,
      25
    ],
    [
      15,
      19
    ],
    [
      63,
      43
    ],
    [
      20,
      42
    ],
    [
      89,
      36
    ],
    [
      61,
      58
    ],
    [
      21,
      27
    ],
    [
      80,
      42
    ]
  ],
  "description": "Neppure tre collegamenti cambiati insieme aprono questa fortezza.",
  "challenge": {
    "level": "Eccellenza",
    "minutes": "25–35 min",
    "mission": "Un assistente sostiene: «Ho provato tutti i modi di togliere fino a tre collegamenti e ricongiungere i tratti in un unico giro. Nessuno accorcia il percorso: dunque è ottimo». La prima affermazione è vera per il giro proposto. La conclusione lo è? Confutatela con un giro più corto e indicate quali archi avete sostituito. Non serve trovare subito l’ottimo.",
    "hints": [
      "Un minimo rispetto a una famiglia di mosse non è un certificato globale. Per migliorare direttamente dovrete cambiare almeno quattro collegamenti del giro proposto.",
      "Ricomponete più tratti insieme oppure ripartite da una struttura diversa. Potete copiare i dati per verificare una risposta AI: pretendete una sequenza completa e controllatene il costo."
    ]
  },
  "baseline": [
    0,
    5,
    7,
    12,
    9,
    4,
    3,
    2,
    1,
    11,
    8,
    13,
    10,
    6
  ]
},
{
  "id": "giro-prova",
  "name": "Il giro e la prova",
  "title": "Il giro e la prova",
  "category": "expert",
  "points": [
    [
      20,
      20
    ],
    [
      40,
      20
    ],
    [
      60,
      20
    ],
    [
      80,
      20
    ],
    [
      20,
      40
    ],
    [
      40,
      40
    ],
    [
      60,
      40
    ],
    [
      80,
      40
    ],
    [
      20,
      60
    ],
    [
      40,
      60
    ],
    [
      60,
      60
    ],
    [
      80,
      60
    ]
  ],
  "description": "Qui non vince chi indovina: vince chi sa dimostrare.",
  "challenge": {
    "level": "Eccellenza",
    "minutes": "15–25 min",
    "mission": "Trovate un giro ottimo senza aprire il confronto. Accompagnatelo con una prova valida per tutti i percorsi: stabilite una lunghezza sotto la quale nessun giro può scendere e costruite un giro che raggiunga proprio quel limite. Due gruppi possono avere ordini diversi ed essere entrambi corretti?",
    "hints": [
      "Le città formano una griglia con passo 20. Qual è la distanza minima fra due città distinte? Quanti collegamenti ha un giro completo?",
      "Ogni giro ha 12 collegamenti, ciascuno lungo almeno 20. Cercate un unico ciclo che usi solo vicini orizzontali o verticali, senza ripetere città."
    ]
  }
}
];
if(typeof module!=='undefined'&&module.exports)module.exports=challenges;else root.TSP.maps.push(...challenges);
})(typeof globalThis!=='undefined'?globalThis:this);
