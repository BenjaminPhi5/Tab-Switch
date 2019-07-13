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

        tabs.forEach(tab => {
            console.log("current tab iteration: ", tab);
            // add the tabs info to the popup
            generateGrid(tab.title, tab.favIconUrl || Config.DEFAULT_FAVICON, tab.mutedInfo.muted);
        });

        // generates a html grid and adds it to the popup
        function generateGrid(title, faviconUrl, muted, tabid){
            let tabInfo = document.createElement("li");
            let logo = document.createElement("img");
            let titleLabel = document.createElement("label");
            let muteButton = document.createElement("img");
            let closeButton = document.createElement("img");

            tabInfo.className = "tabinfo";
            tabInfo.setAttribute("tab-id",String(tabid));
            logo.src = faviconUrl;
            titleLabel.innerHTML = title;
            muteButton.src = "../icons/32.png";
            closeButton.src = "../icons/32.png";
            
            tabInfo.appendChild(logo);
            tabInfo.appendChild(titleLabel);
            tabInfo.appendChild(muteButton);
            tabInfo.appendChild(closeButton);

            // add the tab info to the map and the popup
            tabsMap.set(tabid, tabInfo);
            container.appendChild(tabInfo);
        }
    });
});

// design ideas: see this guy:
// https://github.com/kamranahmedse/tab-switcher
// we have a shortcut extension to mobe tabs and we also allow the user to close a tab
// noice. This will require doing updates inside the popup though.. ooh.
// need to deal with cross site scripting issues from titles but other from that fine.

// need to update a tabs favicon and title when a tab reloads okay.