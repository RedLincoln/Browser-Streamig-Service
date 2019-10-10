var streamingCB = document.getElementById("streamingCB")
var skipOpeningCB = document.getElementById("openingActive")
var skipEndingCB = document.getElementById("endingActive")
console.log(skipEndingCB)
var endingStart = document.getElementById("endingFrom")
var endingEnd = document.getElementById("endingTo")
var openingStart = document.getElementById("endingFrom")
var openingEnd = document.getElementById("endingTo")

var defaultSettings = {
    isStreaming: "false",
    command: "sync",
    isSkipingOpening: "false",
    isSkipingEnding: "false",
    openingStart: "empty",
    openingEnd: "empty",
    endingStart: "empty",
    endingEnd: "empty"
}

var gettingStorageSetting = defaultSettings

function onError(error) {
    console.error(`Error: ${error}`);
}

sendMessage()

function sendStreamingStatus(tabs) {
    
    for (let tab of tabs) {
        browser.tabs.sendMessage(
            tab.id,
            { 
                isStreaming: gettingStorageSetting.isStreaming,
                command : gettingStorageSetting.command,
                skipOpening: gettingStorageSetting.skipOpening,
                skipEnding: gettingStorageSetting.skipEnding,
                openingStart: gettingStorageSetting.openingStart,
                openingEnd: gettingStorageSetting.openingEnd,
                endingStart: gettingStorageSetting.endingStart,
                endingEnd: gettingStorageSetting.endingEnd
            }
        ).then(response => {
            gettingStorageSetting.isStreaming = response.isStreaming
            gettingStorageSetting.skipOpening = response.skipOpening
            gettingStorageSetting.skipEnding = response.skipEnding
            gettingStorageSetting.endingStart = response.value
            gettingStorageSetting.endingEnd = response.value
            gettingStorageSetting.endingStart = response.value
            gettingStorageSetting.endingEnd = response.value
            if (gettingStorageSetting.command == "sync"){
                syncContentAndBackground()                
            }
        }).catch(onError);
    }
}

function syncContentAndBackground(){
    streamingCB.checked = toBool(gettingStorageSetting.isStreaming)
    skipOpeningCB.checked = toBool(gettingStorageSetting.skipOpening)
    skipEndingCB.checked = toBool(gettingStorageSetting.skipEnding)
}

function toBool(stringBool){
    return stringBool == "true"
}

function sendMessage(){
    browser.tabs.query({
        currentWindow: true,
        active: true
    }).then(sendStreamingStatus).catch(onError);
}

skipOpeningCB.onclick = function(){
    gettingStorageSetting.command = "opening"
    gettingStorageSetting.skipEnding = skipOpeningCB.checked
    gettingStorageSetting.endingStart = openingStart.value
    gettingStorageSetting.endingEnd = openingEnd.value        
    sendMessage() 
}

skipEndingCB.onclick = function(){
    gettingStorageSetting.command = "ending"
    gettingStorageSetting.skipEnding = skipEndingCB.checked
    gettingStorageSetting.endingStart = endingStart.value
    gettingStorageSetting.endingEnd = endingEnd.value
    sendMessage() 
}

streamingCB.onclick = function (){
    gettingStorageSetting.command = "streaming"
    sendMessage() 
}