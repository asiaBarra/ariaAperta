"use strict";

// Variabile globale per contenuto originale
let contenutoOriginale = null;

function cercaParola() {
  const inputElem = document.getElementById("search");
  if (!inputElem) {
    console.error("Elemento con id 'search' non trovato.");
    return;
  }

  const parola = inputElem.value.trim();
  if (!parola) return;

  // Salva il contenuto originale una sola volta
  if (!contenutoOriginale) {
    contenutoOriginale = document.body.innerHTML;
  } else {
    // Ripristina il contenuto originale ad ogni ricerca
    document.body.innerHTML = contenutoOriginale;
  }

  const regex = new RegExp(parola, "gi");

  function evidenzia(node) {
    if (node.nodeType === 3) {
      let testo = node.nodeValue;
      if (regex.test(testo)) {
        let span = document.createElement("span");
        span.innerHTML = testo.replace(regex, "<mark>$&</mark>");
        node.parentNode.replaceChild(span, node);
      }
    } else if (
      node.nodeType === 1 &&
      !["SCRIPT", "STYLE", "TEXTAREA", "INPUT", "MARK"].includes(node.tagName)
    ) {
      for (let i = 0; i < node.childNodes.length; i++) {
        evidenzia(node.childNodes[i]);
      }
    }
  }

  evidenzia(document.body);
}


