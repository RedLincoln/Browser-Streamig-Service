var VIDEO_PLAYER_ID = 'video1_html5_api';
var SLEEP_TIME = 1000;
var MESSAGE_TIME = 20;
var STREAMING = "streaming";
var OPENING = "opening";
var ENDING = "ending";
var SYNC = "sync";
var syncPorperties = ["isStreaming","isSkipingOpening", "isSkipingEnding", "openingStart",
                      "openingEnd", "endingStart", "endingEnd"];

var videoPlayer = document.getElementById(VIDEO_PLAYER_ID);
var video_button_div = document.getElementById("video_button_div");
var video_button = document.getElementById("video_button");

/*video_button.onclick = function(){
    videoPlayer.currentTime = sessionStorage.skipTime
}*/


function onMessageListener (message, sender, sendResponse) {
    if (isSync(message.data.command)){
        var data = extractSyncPropertiesFrom(sessionStorage);
        sendResponse(data);    
    }else if(isStreaming(message.data.command)){
        changeStreaming()
    }else if(isSkipingOpening(message.data.command)){
        changeSkipOpening()
    }else if (isSkipingEnding(message.data.command)){
        changeSkipEnding();
    }

    function changeStreaming(){
        sessionStorage.isStreaming = !toBool(sessionStorage.isStreaming);
    }

    function changeSkipOpening(){
        sessionStorage.isSkipingOpening = !toBool(sessionStorage.isSkipingOpening);
        sessionStorage.openingStart = 120;
        sessionStorage.openingEnd = 210;
    }

    function changeSkipEnding(){
        sessionStorage.isSkipingEnding = !toBool(sessionStorage.isSkipingEnding);
        sessionStorage.endingStart = 1340;
        sessionStorage.endingEnd = videoPlayer.duration;
    }

    function extractSyncPropertiesFrom(source){
        var result = {};
        var i;
        for (i = 0; i < syncPorperties.length; i++){
            result[syncPorperties[i]] = source[syncPorperties[i]];
        }
        return result;
    }

    function isSync(command){
        return command === SYNC;
    }

    function isStreaming(command){
        return command === STREAMING;
    }

    function isSkipingOpening(command){
        return command === OPENING;
    }

    function isSkipingEnding(command){
        return command === ENDING;
    }


}

browser.runtime.onMessage.addListener(onMessageListener);

videoPlayer.ontimeupdate =  function(){
    if (canSkipOpening()){
        videoPlayer.currentTime = parseInt(sessionStorage.openingEnd);
        videoPlayer.play();
    }else if(canSkipEnding()){
        videoPlayer.currentTime = parseInt(sessionStorage.endingEnd);
        videoPlayer.play();   
    }else if (askForOpeningSkip() && video_button_div.style.display == "none"){
        showVideoButtonWith("Skip Opening");
        sessionStorage.skipTime = sessionStorage.openingEnd;
    }else if (askForEndingSkip() && video_button_div.style.display == "none"){
        showVideoButtonWith("Skip Ending");
        sessionStorage.skipTime = sessionStorage.endingEnd;
    }else if (!askForOpeningSkip() && !askForEndingSkip()){
        hideVideoButton();
    }

    function askForOpeningSkip(){
        return (videoPlayer.currentTime > parseInt(sessionStorage.openingStart)) && 
               (videoPlayer.currentTime < parseInt(sessionStorage.openingStart) + MESSAGE_TIME);
    }

    function askForEndingSkip(){
        return (videoPlayer.currentTime > parseInt(sessionStorage.endingStart)) && 
               (videoPlayer.currentTime < parseInt(sessionStorage.endingStart) + MESSAGE_TIME);
    }

    function canSkipOpening(){
        return toBool(sessionStorage.isSkipingOpening) &&
               (videoPlayer.currentTime > parseInt(sessionStorage.openingStart)) && 
               (videoPlayer.currentTime < parseInt(sessionStorage.openingEnd));
    }

    function canSkipEnding(){
        return toBool(sessionStorage.isSkipingEnding) &&
               (videoPlayer.currentTime > parseInt(sessionStorage.endingStart)) && 
               (videoPlayer.currentTime < parseInt(sessionStorage.endingEnd));
    }

};

function showVideoButtonWith(message){
    video_button.innerHTML = message;
    video_button.style.display = "block";
    video_button_div.style.display = "block";
}

function hideVideoButton(){
    video_button.style.display = "none";
    video_button_div.style.display = "none";
}

function toBool(string){
    return (string == "true");
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
