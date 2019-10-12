var TOP_SEGMENT_VALUE = 60;
var streamingCB = document.getElementById("streamingCB");
var skipOpeningCB = document.getElementById("openingActive");
var skipEndingCB = document.getElementById("endingActive");
var endingStart = document.getElementById("endingFrom");
var openingStart = document.getElementById("openingFrom");
var openingEnd = document.getElementById("openingTo");
var syncPorperties = ["isStreaming", "command" ,"isSkipingOpening", "isSkipingEnding", "openingStart",
                      "openingEnd", "endingStart", "endingEnd"];

var defaultSettings = {
    isStreaming: "false",
    command: "sync",
    isSkipingOpening: "false",
    isSkipingEnding: "false",
    openingStart: "empty",
    openingEnd: "empty",
    endingStart: "empty"
};


var settings = null;

loadSettings();

function loadSettings(){
    settings = Object.assign(
        defaultSettings, 
        settings
    );
}

function onError(error) {
    console.error('Error: ' + error);
}

sendMessage();

function sendStreamingStatus(tabs) {
    
    tabs.forEach( tab => {
        browser.tabs.sendMessage(
            tab.id,
            { 
                data: settings
            }
        ).then(response => {
            if (settings.command == "sync"){
                syncContentAndBackground(response);             
            }
        }).catch(onError);
    });

    function syncContentAndBackground(response){
        streamingCB.checked = toBool(response.isStreaming);
        skipOpeningCB.checked = toBool(response.isSkipingOpening);
        skipEndingCB.checked = toBool(response.isSkipingEnding);
    }
}


function toBool(stringBool){
    return (stringBool == "true" );
}

function sendMessage(){
    browser.tabs.query({
        currentWindow: true,
        active: true
    }).then(sendStreamingStatus).catch(onError);
}

skipOpeningCB.onclick = function(){
    settings.command = "opening";
    settings.isSkipingOpening = skipOpeningCB.checked;
    settings.openingStart = openingStart.value;
    settings.openingEnd = openingEnd.value;        
    sendMessage(); 
};

skipEndingCB.onclick = function(){
    settings.command = "ending";
    settings.isSkipingEnding = skipEndingCB.checked;
    settings.endingStart = endingStart.value;
    sendMessage();
};

streamingCB.onclick = function (){
    settings.isStreaming = streamingCB.checked;
    settings.command = "streaming";
    sendMessage(); 
};

