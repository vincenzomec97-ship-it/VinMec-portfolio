# Audit professionale del portfolio

Data revisione: 28 luglio 2026  
Branch di lavoro: `portfolio-professional-review`

## Obiettivo e criteri

Questa revisione mantiene identità visiva, palette, struttura generale, ordine delle sezioni, animazioni e distinzione tra progetti principali e secondari. Gli interventi sono limitati a contenuti verificabili, accessibilità, responsive, SEO, prestazioni e manutenibilità.

Posizionamento principale proposto: **Junior Frontend Developer & UI/UX Designer**.  
AI, automazioni, SEO e digital marketing vengono presentati come competenze complementari e metodo di lavoro, non come ruoli senior o risultati commerciali dimostrati.

## Stato iniziale verificato

- Repository Git presente e branch di lavoro separato da `main`.
- Commit di sicurezza presente: `071cc1e portfolio prima del cambiamento`.
- Home, menu, filtri, modali e caricamento dei progetti funzionanti in locale.
- Due progetti principali e relativa distinzione visiva presenti.
- Case study presenti per English Quiz Lab, C.M. Pulizie, ClientFlow, CasaBot e FitZone.
- Demo pubbliche controllate e raggiungibili; repository GitHub pubblici disponibili per cinque progetti. Il repository di English Quiz Lab è privato.
- Lighthouse iniziale: Performance 80, Accessibilità 96, Best Practices 100, SEO 100.
- Nessun errore JavaScript rilevato nella console durante il controllo iniziale della home.

## Piano prioritario

| Priorità | Area | Problema verificato | Intervento sicuro | File interessati | Rischio |
|---|---|---|---|---|---|
| Alta | Credibilità | C.M. Pulizie descrive automazioni Google Apps Script/Sheets/email/PDF come attive, ma la demo pubblica è predisposta e non collegata a un endpoint operativo | Correggere i testi distinguendo ciò che è attivo da ciò che è predisposto | `data/projects.json`, fallback JS, case study C.M., home | Basso |
| Alta | Posizionamento | Titolo professionale troppo ampio su tre ruoli equivalenti | Usare “Junior Frontend Developer & UI/UX Designer”; citare AI/automazioni come competenza complementare | Home, metadati, CV ATS, documentazione LinkedIn | Basso |
| Alta | Progetti | English Quiz Lab, progetto tecnicamente più completo, non è il primo progetto principale | Invertire la priorità dei due progetti principali senza cambiarne numero, stile o sezione | Dati progetti e testi home | Basso |
| Alta | CV | Il PDF visuale non include i progetti più forti e contiene affermazioni non contestualizzate | Conservare il PDF esistente e aggiungere un CV ATS HTML prudente, con secondo pulsante dedicato | Home, `cv-vincenzo-meccariello-ats.html` | Basso |
| Alta | Link | Due URL Figma sono malformati perché manca `?` prima dei parametri | Correggere la sintassi senza cambiare la destinazione | Dati progetti e fallback JS | Basso |
| Alta | Prestazioni | Logo 512×512 usato a 42 px e immagine hero sovradimensionata; LCP iniziale 4,5 s | Generare varianti ottimizzate mantenendo la resa visiva; impostare dimensioni esplicite e priorità corrette | Asset immagini, home, CSS | Medio |
| Media | Accessibilità | Contrasto insufficiente del contatore nei filtri; focus e reduced motion da uniformare | Correggere solo colori funzionali compatibili con la palette e completare gli stati tastiera/movimento ridotto | CSS, JS se necessario | Basso |
| Media | Contenuti | Descrizioni di card non uniformi e alcune tecnologie/competenze sono più ampie delle evidenze | Riscrivere testi brevi, concreti e verificabili; uniformare stato e lunghezza delle card | JSON, fallback JS, home | Basso |
| Media | Case study | Gerarchia e trasparenza non uniformi; English richiede nota sul repository privato, Shoes non ha un case study dedicato | Migliorare i case study esistenti e aggiungere informazioni di stato senza inventare risultati | Pagine case study | Medio |
| Media | Dati | `data/projects.json` e `assets/js/projects.js` duplicano gli stessi record | Mantenere il fallback ma documentare/sincronizzare la fonte con un controllo automatico semplice | JSON, JS, guida manutenzione | Medio |
| Media | SEO | Metadati generalmente buoni, ma una demo è senza canonical e i dati strutturati/URL richiedono coerenza | Correggere canonical, titoli, description e schema Person/CreativeWork solo con dati reali | HTML, sitemap, robots | Basso |
| Media | Responsive | Necessaria verifica sistematica a 320, 375, 430, 768, 1024 e 1440 px | Correggere overflow, spaziature, pulsanti e immagini solo dove i test evidenziano problemi | CSS e pagine coinvolte | Medio |
| Bassa | GitHub | Descrizioni, topics, homepage e README dei repository non sono uniformi | Documentare le modifiche consigliate senza pubblicarle automaticamente | Report e guida | Nessuno |
| Bassa | Manutenzione | README principale non rappresenta più correttamente portfolio e progetti | Aggiornare architettura, avvio locale, contenuti e limiti noti | `README.md` | Basso |

## Gerarchia editoriale proposta

La struttura del portfolio resta invariata. All’interno delle categorie esistenti, la priorità consigliata è:

1. English Quiz Lab — progetto principale.
2. C.M. Pulizie — progetto principale, con descrizione corretta delle integrazioni predisposte.
3. ClientFlow.
4. CasaBot.
5. FitZone.
6. Shoes M.V. 3D — prototipo con geometria di fallback, non prodotto concluso.

I concept Figma e il form di registrazione restano nella struttura attuale, con peso editoriale secondario e descrizioni coerenti con il loro stato.

## Vincoli di veridicità

Non verranno aggiunti:

- clienti, conversioni, fatturato, percentuali o risultati non documentati;
- esperienze lavorative, anni di esperienza o certificazioni non verificabili;
- tecnologie non presenti nel codice o non confermate;
- indicazioni che CasaBot usi un modello AI esterno;
- indicazioni che le automazioni di C.M. Pulizie siano operative nella demo pubblica;
- indicazioni che Shoes M.V. 3D includa già un modello GLB definitivo.

## Verifiche finali previste

- confronto visuale prima/dopo;
- test tastiera, menu, filtri, modali, form e link;
- controllo console e richieste di rete;
- test responsive alle sei larghezze richieste e in orientamento orizzontale;
- scansione link interni, immagini, CV, demo e GitHub;
- validazione di metadati, canonical, sitemap, robots e dati strutturati;
- nuova misurazione Lighthouse;
- avvio di un server locale e consegna delle istruzioni, senza merge su `main` e senza pubblicazione online.

## Esito della verifica

- Home verificata a 320, 375, 430, 768, 1024 e 1440 px: 10 card presenti, un solo `h1`, nessun overflow.
- Case study principali, demo FitZone e CV ATS: risposta locale 200, un solo `h1`, nessun overflow.
- JSON e fallback JavaScript confrontati automaticamente: 10 progetti sincronizzati.
- Sitemap validata come XML.
- Lighthouse finale locale: Performance 93, Accessibilità 100, Best Practices 100, SEO 100.

## Informazioni da confermare con il proprietario

Questi elementi resteranno formulati in modo prudente finché non saranno forniti dati verificabili:

- date esatte di formazione e certificazioni;
- link pubblici alle credenziali;
- livello di inglese;
- natura retribuita o personale dei lavori indicati come freelance;
- disponibilità lavorativa, località e modalità preferita;
- eventuale numero di telefono da includere nel CV ATS;
- possibilità di rendere pubblico il repository di English Quiz Lab.
