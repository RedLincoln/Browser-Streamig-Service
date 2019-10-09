const EPISODE_INDEX_CLASS = 0
const VIDEO_PLAYER_ID = 'video1_html5_api'
const VIDEO_DIV_ID = "video1"
const NEXT_BUTTON_CLASS = 'anipager-next'
const EPISODES_CLASS = 'episodes'
const ACTIVE_EPISODE_CLASS  = 'active'
const ACTIVE_EPISODE_INDEX = 2
const EPISODES_COUNT_OFFSET = 1
const SOURCE_VIDEO_PLAYER_INDEX = 1

/*
    Existen dos tipos de paginas de episodios con next
        1.  Next que no tiene href (nuevo capito que no tiene siguiete).
            En este caso se tienen dos componentes con la clase anipager-next
            el primer componente esta vacio y el segundo tiene detalles de color
        2.  Next que tiene href (existe nuevo episodio)
            El caso que no enteresa es necesario comprobar que tiene next
*/

var isFullScreen = false
var videoPlayer = document.getElementById(VIDEO_PLAYER_ID)
var videoDiv = document.getElementById(VIDEO_DIV_ID)
var videoSrc = videoPlayer.childNodes[SOURCE_VIDEO_PLAYER_INDEX]
var srcToChange = videoPlayer.getAttribute('src')
var episodes = document.getElementsByClassName(EPISODES_CLASS)[EPISODE_INDEX_CLASS].childNodes
var activeEpisode = document.getElementsByClassName(ACTIVE_EPISODE_CLASS)[ACTIVE_EPISODE_INDEX]
var next = document.getElementsByClassName(NEXT_BUTTON_CLASS)


videoPlayer.onended = function(){
    var nextEpisode = getNextEpisodeNumber()
    if (nextEpisode != parseInt(activeEpisode.innerHTML)){
        runNewEpisode(nextEpisode)
    }
};


function changeEpisodeNumber(newEpisodeNumber, srcToChange){
    var patt = new RegExp('([Ee]pisode-)(\\d+)')
    var validEpisodeNumber = toValidEpisodeNumber(newEpisodeNumber)
    var newSrc = srcToChange.replace(patt, '$1'+ validEpisodeNumber)
    return newSrc
}

function toValidEpisodeNumber(episodeNumebr){
    if (episodeNumebr < 10) return '0'+episodeNumebr
    return episodeNumebr
}

function getNextEpisodeNumber(){
    if(hasNewEpisode()) return (parseInt(activeEpisode.innerHTML, 10) + 1)
    return parseInt(activeEpisode.innerHTML, 10)
}

function hasNewEpisode(){
    return parseInt(activeEpisode.innerHTML, 10) < episodes.length - EPISODES_COUNT_OFFSET - EPISODES_COUNT_OFFSET
}

function runNewEpisode(newEpisode){
    if (document.fullscreenElement == videoDiv){
        changeVideoPlayerContentTo(newEpisode)
    }else {
        changePageContentTo(newEpisode)
    }
}

function changeVideoPlayerContentTo(newEpisode){
    changeEpisodeTo(newEpisode)
    playVideoFromBeggining()
    removeActiveEpisode(parseInt(activeEpisode.innerHTML) - 1 + EPISODES_COUNT_OFFSET)
    setActiveEpisode(newEpisode - 1 + EPISODES_COUNT_OFFSET)
}

function changePageContentTo(newEpisode){
    var newEpisodeUrl = changeEpisodeNumber(newEpisode, window.location.href)
    window.location.href = newEpisodeUrl
}

function playVideoFromBeggining(){
    videoPlayer.currentTime = 0
    videoPlayer.play()
}

function changeEpisodeTo(episodeNumber){
    var newSrc = changeEpisodeNumber(episodeNumber, srcToChange)
    videoPlayer.src = newSrc
    videoSrc.src = newSrc
    videoPlayer.load()
}

function setActiveEpisode(index){
    activeEpisode = episodes[index].childNodes[0]
    activeEpisode.className = "active"
}

function removeActiveEpisode(index){
    activeEpisode.removeAttribute('class')
}
