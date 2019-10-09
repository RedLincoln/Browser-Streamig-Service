var streamingCB = document.getElementById("streamingCB")

var defaultSettings = {
    isStreaming: "false",
    isSync: "true"
}

var gettingStorageSetting = defaultSettings

function onError(error) {
    console.error(`Error: ${error}`);
}

sendMessage()

function sendStreamingStatus(tabs) {
    
    for (let tab of tabs) {
        console.log(gettingStorageSetting)
        browser.tabs.sendMessage(
            tab.id,
            { isStreaming: gettingStorageSetting.isStreaming,
              isSync : gettingStorageSetting.isSync }
        ).then(response => {
            gettingStorageSetting.isStreaming = response.isStreaming
            if (gettingStorageSetting.isSync == "true")
                streamingCB.checked = gettingStorageSetting.isStreaming == "true"
            gettingStorageSetting.isSync = "false"
        }).catch(onError);
    }
}

function sendMessage(){
    browser.tabs.query({
        currentWindow: true,
        active: true
    }).then(sendStreamingStatus).catch(onError);
}

streamingCB.onclick = function (){ sendMessage() }