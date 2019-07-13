window.addEventListener('load', function load(event) {

    /**
     * Constants
     *
     * @type {Object}
     */
    var Config = {

        // Default favicon to use
        DEFAULT_FAVICON: '../icons/48.png',
        
    };

    chrome.tabs.query({}, function(tabs){
        /* 
        Now tabs contains a list of all the current tabs, which can now be displayed in the popup
        */
        // container is the html element to add tab grids to.
        container = document.getElementById("tabsContainer");

        // map of currently held tabs
        tabsMap = new Map();

        // setup a html element for each tab
        tabs.forEach(tab => {
            console.log("current tab iteration: ", tab);
            // add the tabs info to the popup
            generateGrid(tab.title, tab.favIconUrl || Config.DEFAULT_FAVICON,
                tab.mutedInfo.muted, tab.id, tab.windowId);
        });


        // switch which tab the user can see.
        function switchTab(tabId, windowId){
            // set the tab and window to be active/focused
            chrome.tabs.update(tabId, {active: true}, function () {
                chrome.windows.update(windowId, {focused: true});
              });
        }


        // generates a html grid and adds it to the popup
        function generateGrid(title, faviconUrl, muted, tabid, windowId){
            let tabInfo = document.createElement("div");
            let logo = document.createElement("img");
            let titleDiv = document.createElement("div");
            let buttonsHolder = document.createElement("div");
            let muteButton = document.createElement("button");
            let closeButton = document.createElement("img");
            let line = document.createElement("hr");

            // setup the html tags' info
            tabInfo.className = "tabinfo";
            tabInfo.setAttribute("tab-id",String(tabid));
            logo.src = faviconUrl;
            logo.className = "logo";
            titleDiv.innerHTML = title.substring(0, 90);
            titleDiv.className = "titlediv";
            buttonsHolder.className = "buttons-holder";
            muteButton.innerHTML = muted ? "unmute" : "mute";
            muteButton.className = "buttons mute-button";
            closeButton.src = "res/close48.png";
            closeButton.className = "close";
            line.id = "hr" + String(tabid);

            // add the switching onclick
            titleDiv.onclick = function(){
                switchTab(tabid, windowId);
            }

            buttonsHolder.appendChild(muteButton);
            buttonsHolder.appendChild(closeButton);
            
            // add all the html to the popup
            tabInfo.appendChild(logo);
            tabInfo.appendChild(titleDiv);
            tabInfo.appendChild(buttonsHolder);
            

            // add the tab info to the map and the popup
            tabsMap.set(tabid, {html: tabInfo, windowId: windowId});
            container.appendChild(tabInfo);
            container.appendChild(line);
        }
    });
});

// design ideas: see this guy:
// https://github.com/kamranahmedse/tab-switcher
// we have a shortcut extension to mobe tabs and we also allow the user to close a tab
// noice. This will require doing updates inside the popup though.. ooh.
// need to deal with cross site scripting issues from titles but other from that fine.

// need to update a tabs favicon and title when a tab reloads okay.

// don't forget to load a nice fancy google font.
// just have the thing at the top with maybe the logo or something that looks nice sort it out

// on switching tabs hide the window
