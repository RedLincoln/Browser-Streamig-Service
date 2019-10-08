document.body.style.border = "5px solid blue";

/*
    Existen dos tipos de paginas de episodios con next
        1.  Next que no tiene href (nuevo capito que no tiene siguiete).
            En este caso se tienen dos componentes con la clase anipager-next
            el primer componente esta vacio y el segundo tiene detalles de color
        2.  Next que tiene href (existe nuevo episodio)
            El caso que no enteresa es necesario comprobar que tiene next
*/

var videoPlayer = document.getElementById('video1_html5_api')

console.log(localStorage.fullScreen)
if (localStorage.fullScreen){
    videoPlayer.requestFullscreen()
}

var next = document.getElementsByClassName("anipager-next")

var nextEpisodeHref = null
if (haveNextEpisode(next[0])){
    nextEpisodeHref = next[0].childNodes[0].getAttribute("href")
}else{
    console.log("no next epidose")
}

videoPlayer.onended = function(){
    if (nextEpisodeHref != null){
        localStorage.fullScreen = true
        window.location.href = nextEpisodeHref
    }
};

function haveNextEpisode(nextComponent){
    var content =  nextComponent.innerHTML
    content = content.trim ?  content.trim() : content.replace(/^\s+/,'')
    if (content == ''){
        return false
    }
    return true
}


function openFullscreen(elem) {
    elem.mozRequestFullScreen();
}

function isFullScreen(){
    return (screen.availHeight || screen.height-30) <= window.innerHeight
}


