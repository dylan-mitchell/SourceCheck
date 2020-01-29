function loadJSON(path, success, error) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        if (success) success(JSON.parse(xhr.responseText));
      } else {
        if (error) error(xhr);
      }
    }
  };
  xhr.open("GET", path, true);
  xhr.send();
}

let setup = function(data) {
  console.log("Loading sources...");
  sources = data;
  console.log(sources);
  var flaggedDomains = [];
  var detectPort;
  var popupPort;
  var domainScanned = "";

  function connected(p) {
    if (p.name === "detectPort") {
      detectPort = p;
      detectPort.onMessage.addListener(function(m) {
        var detectedFlag = 0;
        domainScanned = m.check[m.check.length - 1];
        for (var i = 0; i < m.check.length; i++) {
          domain = sources[m.check[i]];
          if (typeof domain !== "undefined") {
            detectedFlag = 1;
            if (!flaggedDomains.includes(domain)) {
              domain["domain"] = m.check[i];
              detectPort.postMessage({ flagged: domain });
              flaggedDomains.push(domain);
            }
          }
        }
        console.log(detectedFlag);
        if (detectedFlag === 0) {
          flaggedDomains = [];
        }
        detectPort.disconnect();
      });
    } else if (p.name === "popupPort") {
      popupPort = p;
      popupPort.onMessage.addListener(function(m) {
        if (flaggedDomains.length === 0) {
          popupPort.postMessage({ flagged: domainScanned });
        } else {
          //Last item is domainScanned
          flaggedDomains.push(domainScanned);
          popupPort.postMessage({ flagged: flaggedDomains });
          flaggedDomains.pop();
        }
        popupPort.disconnect();
      });
    }
  }

  browser.runtime.onConnect.addListener(connected);
};

loadJSON("data/sources.json", setup, function(xhr) {
  console.log(xhr);
});
