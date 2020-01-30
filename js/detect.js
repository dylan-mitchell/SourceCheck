function url2Domain(url) {
  "use strict";

  if (url) {
    url = url.toString().replace(/^(?:https?|ftp)\:\/\//i, "");
    url = url.toString().replace(/^www\./i, "");
    url = url.toString().replace(/\/.*/, "");
    return url;
  }
}

//Check if chrome
if (chrome) {
  browser = chrome;
}

//Check all the links on the page
var aTags = document.getElementsByTagName("a");
var links = [];
for (var i = 0; i < aTags.length; i++) {
  links.push(aTags[i].href);
}

// Add the current page url
links.push(window.location.href);

//Get the domain name of all the links
var domains = [];
for (var i = 0; i < links.length; i++) {
  domains.push(url2Domain(links[i]));
}

let port = browser.runtime.connect({ name: "detectPort" });
port.postMessage({ check: domains });

port.onMessage.addListener(function(m) {
  console.log(m.flagged);
  for (var i = 0; i < aTags.length; i++) {
    if (url2Domain(aTags[i].href) === m.flagged.domain) {
      aTags[i].style.color = "black";
      aTags[i].style.background = "yellow";
      inner = aTags[i].textContent;
      aTags[i].textContent = "⚠️Flagged by SourceCheck⚠️ " + inner;
    }
  }
});

browser.runtime.onConnect.addListener(connected);
