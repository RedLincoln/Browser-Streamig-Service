var EPISODE_INDEX_CLASS = 0;
var VIDEO_PLAYER_ID = 'video1_html5_api';
var VIDEO_DIV_ID = "video1";
var EPISODE_LABEL_QS = 'span[id="titleleft"]';
var NEXT_BUTTON_CLASS = 'anipager-next';
var EPISODES_CLASS = 'episodes';
var ACTIVE_EPISODE_CLASS  = 'active';
var ACTIVE_EPISODE_INDEX = 2;
var EPISODES_COUNT_OFFSET = 1;
var SOURCE_VIDEO_PLAYER_INDEX = 1;
var SLEEP_TIME = 1000;
var STREAMING = "streaming";
var OPENING = "opening";
var ENDING = "ending";
var SYNC = "sync";

/*
    Existen dos tipos de paginas de episodios con next
        1.  Next que no tiene href (nuevo capito que no tiene siguiete).
            En este caso se tienen dos componentes con la clase anipager-next
            el primer componente esta vacio y el segundo tiene detalles de color
        2.  Next que tiene href (existe nuevo episodio)
            El caso que no enteresa es necesario comprobar que tiene next
*/

var episodeLabel = document.querySelector(EPISODE_LABEL_QS);
var videoPlayer = document.getElementById(VIDEO_PLAYER_ID);
var videoDiv = document.getElementById(VIDEO_DIV_ID);
var videoSrc = videoPlayer.childNodes[SOURCE_VIDEO_PLAYER_INDEX];
var srcToChange = videoPlayer.getAttribute('src');
var episodes = document.getElementsByClassName(EPISODES_CLASS)[EPISODE_INDEX_CLASS].childNodes;
var activeEpisode = document.getElementsByClassName(ACTIVE_EPISODE_CLASS)[ACTIVE_EPISODE_INDEX];
var next = document.getElementsByClassName(NEXT_BUTTON_CLASS);
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
        console.log(sessionStorage)
        console.log(data)
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

if (toBool(sessionStorage.isStreaming)){
    playVideoFromBeggining();
}

videoPlayer.ontimeupdate =  function(){
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
        return to(sessionStorage.isSkipingOpening) &&
               (videoPlayer.currentTime > parseInt(sessionStorage.openingStart)) && 
               (videoPlayer.currentTime < parseInt(sessionStorage.openingEnd)) &&
               !toBool(openingJumpDone);
    }

    function canSkipEnding(){
        return toBool(sessionStorage.isSkipingEnding) &&
               (videoPlayer.currentTime > parseInt(sessionStorage.endingStart)) && 
               (videoPlayer.currentTime > parseInt(sessionStorage.endingEnd)) && 
               !toBool(endingJumpDone);
    }

};

videoPlayer.onended = function(){
    var nextEpisode = getNextEpisodeNumber();
    if ((nextEpisode != parseInt(activeEpisode.innerHTML)) && toBool(sessionStorage.isStreaming)){
        runNewEpisode(nextEpisode);
    }
};

function changeLabelTo(newEpisode){
    var validEpisodeNumber = toValidEpisodeNumber(newEpisode);
    episodeLabel.innerHTML = "Episode " + validEpisodeNumber;
}




function getNextEpisodeNumber(){
    if(hasNewEpisode()) return (parseInt(activeEpisode.innerHTML, 10) + 1);
    return parseInt(activeEpisode.innerHTML, 10);
}

function hasNewEpisode(){
    return parseInt(activeEpisode.innerHTML, 10) < episodes.length - EPISODES_COUNT_OFFSET - EPISODES_COUNT_OFFSET;
}

async function runNewEpisode(newEpisode){
    await sleep(SLEEP_TIME);
    if (document.fullscreenElement == videoDiv){
        changeVideoPlayerContentTo(newEpisode);
    }else {
        changePageContentTo(newEpisode);
    }
}

function changeVideoPlayerContentTo(newEpisode){
    changeEpisodeTo(newEpisode);
    playVideoFromBeggining();
    removeActiveEpisode(parseInt(activeEpisode.innerHTML) - 1 + EPISODES_COUNT_OFFSET);
    setActiveEpisode(newEpisode - 1 + EPISODES_COUNT_OFFSET);
    changeLabelTo(newEpisode);
}

function changePageContentTo(newEpisode){
    var newEpisodeUrl = changeEpisodeNumber(newEpisode, window.location.href);
    window.location.href = newEpisodeUrl;
}

function playVideoFromBeggining(){
    videoPlayer.currentTime = 0;
    videoPlayer.play();
}

function changeEpisodeTo(episodeNumber){
    var newSrc = changeEpisodeNumber(episodeNumber, srcToChange);
    videoPlayer.src = newSrc;
    videoSrc.src = newSrc;
    videoPlayer.load();
}

function setActiveEpisode(index){
    activeEpisode = episodes[index].childNodes[0];
    activeEpisode.className = "active";
}

function removeActiveEpisode(index){
    activeEpisode.removeAttribute('class');
}

function toBool(string){
    return (string == "true");
}


function toValidEpisodeNumber(episodeNumebr){
    if (episodeNumebr < 10) return '0'+episodeNumebr;
    return episodeNumebr;
}


function changeEpisodeNumber(newEpisodeNumber, srcToChange){
    var patt = new RegExp('([Ee]pisode-)(\\d+)')
    var validEpisodeNumber = toValidEpisodeNumber(newEpisodeNumber);
    var newSrc = srcToChange.replace(patt, '$1'+ validEpisodeNumber);
    return newSrc;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
