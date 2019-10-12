var SLEEP_TIME = 1000;
var MESSAGE_TIME = 20;
var EPISODES_COUNT_OFFSET = 1;
var EPISODES_LENGTH_OFFSET = 2;
var STREAMING = "streaming";
var OPENING = "opening";
var ENDING = "ending";
var SYNC = "sync";
var syncPorperties = ["isStreaming","isSkipingOpening", "isSkipingEnding", "openingStart",
                      "openingEnd", "endingStart", "endingEnd"];

var videoPlayer = document.getElementById('video1_html5_api');
var videoDiv = document.getElementById("video1");
var video_button_div = document.createElement("div");
var video_button = document.createElement("button");
var parentActiveEpisode = document.getElementsByClassName('active')[2].parentElement;
var activeEpisode = parentActiveEpisode.firstChild;
var episodes = document.getElementsByClassName('episodes')[0].childNodes;
var episodeLabel = document.getElementsByClassName("singletitlebottom")[0].childNodes[3].childNodes[1];
var animeName = document.querySelector('a[id="titleleft"]');