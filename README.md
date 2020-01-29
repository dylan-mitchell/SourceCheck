# SourceCheck ![](https://github.com/dylan-mitchell/SourceCheck/blob/master/icons/check.svg "Check")
Check the credibility of websites and the links they link to.

SourceCheck is a Firefox Browser extension that checks the current domain of the current page, as well as the domains of all of the links on that page against a list of unreliable domains.

The list of unreliable domains comes from [opensources.co](https://github.com/OpenSourcesGroup/opensources). I'm actively looking for a better source for this list, as it appears that [opensources.co](https://opensources.co) is a dead project.

## Install

You can temporarily install it to Firefox from source.

To do so:

1. Clone the repo
2. Open Firefox and enter `about:debugging#/runtime/this-firefox` into the search bar
3. Click `Load Temporary Add-on...`
4. Select the `manifest.json` file from the repo

You can manually remove the extension, or restart Firefox and it will automatically be removed.

Or install from the Add-ons directory

https://addons.mozilla.org/en-US/firefox/addon/sourcecheck/
