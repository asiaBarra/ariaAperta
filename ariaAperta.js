"use strict";

function cercaParola() {
  const inputElem = document.getElementById("search");
  if (!inputElem) {
    console.error("Elemento con id 'search' non trovato.");
    return;
  }

  const parola = inputElem.value.trim();
  if (!parola) {
    rimuoviEvidenziazione(); // Rimuovi evidenziazioni se la ricerca è vuota
    return;
  }

  rimuoviEvidenziazione();

  const regex = new RegExp(parola, "gi");

  function evidenzia(node) {
    if (node.nodeType === 3) {
      let testo = node.nodeValue;
      if (regex.test(testo)) {
        let span = document.createElement("span");
        span.innerHTML = testo.replace(regex, "<mark class='evidenziato'>$&</mark>");
        node.parentNode.replaceChild(span, node);
      }
    } else if (
      node.nodeType === 1 &&
      !["SCRIPT", "STYLE", "TEXTAREA", "INPUT", "MARK"].includes(node.tagName)
    ) {
      for (let i = node.childNodes.length - 1; i >= 0; i--) {
        evidenzia(node.childNodes[i]);
      }
    }
  }

  evidenzia(document.body);
}

function rimuoviEvidenziazione() {
  const evidenziati = document.querySelectorAll("mark.evidenziato");
  evidenziati.forEach(mark => {
    const parent = mark.parentNode;
    parent.replaceChild(document.createTextNode(mark.textContent), mark);
    parent.normalize(); // Unisce i nodi di testo adiacenti
  });
}