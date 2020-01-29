let port = browser.runtime.connect({ name: "popupPort" });

port.postMessage({ getFlagged: "true" });

port.onMessage.addListener(function(m) {
  console.log(m.flagged);
  if (typeof m.flagged === "string") {
    var url = document.createElement("H2"); // Create a <h2> element
    url.textContent = m.flagged; // Insert text
    url.classList.add("url");
    document.body.appendChild(url);
    var header = document.createElement("H2"); // Create a <h2> element
    header.textContent = "This site appears to be credible."; // Insert text
    document.body.appendChild(header);
  } else {
    var url = document.createElement("H2"); // Create a <h2> element
    url.textContent = m.flagged.pop(); // Insert text
    url.classList.add("url");
    document.body.appendChild(url);
    var flaggedSitesHeader = document.createElement("H1"); // Create a <h2> element
    flaggedSitesHeader.textContent = "Flagged Sites:"; // Insert text
    document.body.appendChild(flaggedSitesHeader);
    for (var i = 0; i < m.flagged.length; i++) {
      //Domain
      var header = document.createElement("H2"); // Create a <h2> element
      header.textContent = "⚠️ " + m.flagged[i].domain; // Insert text
      document.body.appendChild(header);
      //Reasons why
      var list = document.createElement("ul"); // Create a <ul> element
      var item = document.createElement("li");
      item.textContent = m.flagged[i].type;
      list.appendChild(item);

      if (m.flagged[i]["2nd type"]) {
        item = document.createElement("li");
        item.textContent = m.flagged[i]["2nd type"];
        list.appendChild(item);
      }

      if (m.flagged[i]["3rd type"]) {
        item = document.createElement("li");
        item.textContent = m.flagged[i]["3rd type"];
        list.appendChild(item);
      }

      document.body.appendChild(list);
    }
  }
});
