## Consegna

💡 **_Premessa:_** Stai sviluppando un **_campo di ricerca intelligente_** simile a quello di Amazon. Quando l'utente digita, una **_tendina di suggerimenti_** mostra i prodotti corrispondenti alla ricerca. Per evitare richieste API eccessive, devi ottimizzare la ricerca con il **_debounce_**.

```js
Nota: a differenza di quanto visto finora negli esempi, per accedere all'API utilizzare l'url base:
http://localhost:3333
al posto di:
https://freetestapi.com/api/v1
Ad esempio:
http://localhost:3333/users
per chiamare l'endpoint /users
Clicca qui per la guida su come installare il Server API Locale!
```

## 📌 Milestone 1: Creare un campo di ricerca e mostrare la lista dei suggerimenti

1. Crea un **_campo di input_** `(<input type="text">)` in cui l’utente può digitare.

2. Effettua una chiamata API a: `/products?search=[query]`

   - La query deve essere sostituita con il testo digitato.

3. Mostra i risultati API sotto l'input in una **_tendina di suggerimenti_**.

4. Se l'utente cancella il testo, la tendina scompare.

**_Obiettivo:_** Mostrare suggerimenti dinamici in base alla ricerca dell'utente.

## 📌 Milestone 2: Implementare il Debounce per Ottimizzare la Ricerca

1. Attualmente, ogni pressione di tasto esegue una richiesta API. Questo è inefficiente!

2. Implementa una funzione di **_debounce_** per ritardare la chiamata API fino a quando l’utente smette di digitare per un breve periodo (es. **_300ms_**)

3. Dopo l’implementazione, verifica che la ricerca **_non venga eseguita immediatamente a ogni tasto premuto_**, ma solo dopo una breve pausa.

**_Obiettivo:_** Ridurre il numero di richieste API e migliorare le prestazioni.

## 🎯 Bonus: Caricare i Dettagli del Prodotto Selezionato

1. Quando l’utente clicca su un prodotto nella tendina, nascondi la tendina e carica i **_dettagli completi_** del prodotto sotto il campo di ricerca.

2. Effettua una richiesta API per ottenere i dettagli completi: `/products/{id}`

3. Mostra i dettagli del prodotto selezionato (es. **_image, name, description, price_**).

**_Obiettivo:_** Aggiungere interattività permettendo di visualizzare le informazioni complete di un prodotto.
