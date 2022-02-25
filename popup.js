
const actualSiteLabel = document.getElementById('actual-site');
const actualCookieValueLabel = document.getElementById('actual-cookie-value');
const buttonContainer = document.getElementById('button-container');

const COOKIENAME = "slot";
const COOKIEURL = "https://segugioassicurazionip.gruppomol.lcl/";

// The async IIFE is necessary because Chrome <89 does not support top level await.
(async function initPopupWindow() {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    if (tab?.url) {
        try {
            let url = new URL(tab.url);
            actualSiteLabel.innerHTML = url;

            chrome.cookies.get(
                {"name": COOKIENAME, "url": COOKIEURL},
                (cookie) => {
                    if (cookie) {
                        actualCookieValueLabel.innerHTML = cookie.value;
                    } else {
                        actualCookieValueLabel.innerHTML = "cookie non presente";
                    }
                }
            )
        } catch {}
    }

})();

const config = [
    'Sprint',
    'Fast01',
    'Fast02'
]

function createButton(container, buttonLabel) {
    // create a new div element
    const newButton = document.createElement("button");
    // and give it some content
    const newContent = document.createTextNode(buttonLabel);
    // add the text node to the newly created div
    newButton.appendChild(newContent);
    // add the newly created element and its content into the DOM
    document.body.insertBefore(newButton, container);
}

window.addEventListener('load', () => {
    // creo i bottoni in base alla config
    config.map(button => {
        createButton(buttonContainer, button)
    })
})

window.addEventListener('click', (e) => {
    if (e.target.nodeName === 'BUTTON') {
        const cookieContentToSet = e.target.innerHTML;
        chrome.cookies.get(
            {"name": COOKIENAME, "url": COOKIEURL},
            (cookie) => {
                console.log(cookie);
                if (cookie) {
                    chrome.cookies.set({
                        url: COOKIEURL,
                        domain: cookie.domain,
                        name: cookie.name,
                        expirationDate: cookie.expirationDate,
                        value: cookieContentToSet
                    })
                }
            }
        )
    }
})


