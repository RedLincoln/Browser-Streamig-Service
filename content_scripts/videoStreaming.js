var VIDEO_PLAYER_ID = 'video1_html5_api';
var VIDEO_DIV_ID = "video1";
var SLEEP_TIME = 1000;
var STREAMING = "streaming";
var OPENING = "opening";
var ENDING = "ending";
var SYNC = "sync";


var videoPlayer = document.getElementById(VIDEO_PLAYER_ID);
var videoDiv = document.getElementById(VIDEO_DIV_ID);
var openingJumpDone = "false";
var endingJumpDone = "false";


function onMessageListener (message, sender, sendResponse) {
    if (isStreaming(message.data.command)){
        changeStreaming();
    }else if (isSkipingOpening(message.data.command)){
        changeSkipOpening();
    }else if (isSkipingEnding(message.data.command)){
        changeSkipEnding();
    }else if (isSync(message.data.command)){
        var data = syncData();
        sendResponse(data);    
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

    function syncData(){
        return Object.assign(message.data, sessionStorage); 
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

    function isSync(command){
        return command === SYNC;
    }

}

browser.runtime.onMessage.addListener(onMessageListener);

videoPlayer.ontimeupdate =  function(){
    //console.log(sessionStorage)
    if (canSkipOpening()){
        videoPlayer.currentTime = parseInt(sessionStorage.openingEnd);
        videoPlayer.play();
        openingJumpDone = "true";
    }

    if (canSkipEnding()){

        videoPlayer.currentTime = parseInt(sessionStorage.endingEnd);
        videoPlayer.play();   
        endingJumpDone = "true";
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

function toBool(string){
    return (string == "true");
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
