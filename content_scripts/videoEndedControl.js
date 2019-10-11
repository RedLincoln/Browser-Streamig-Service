// @flow

var EPISODES_COUNT_OFFSET = 1;
var EPISODES_LENGTH_OFFSET = 2;

var videoControl = {
	

	initialize : function () {
		self.self = this;
		self.videoPlayer = document.getElementById('video1_html5_api');
		self.videoDiv = document.getElementById("video1");
		self.parentActiveEpisode = document.getElementsByClassName('active')[2].parentElement;
		self.activeEpisode = self.parentActiveEpisode.firstChild;
		self.episodes = document.getElementsByClassName('episodes')[0].childNodes;
		self.episodeLabel = document.getElementsByClassName("singletitlebottom")[0].childNodes[3].childNodes[1];
		self.animeName = document.querySelector('a[id="titleleft"]');
		self.videoPlayer.onended = self.onEndedHandler;
		if (sessionStorage.isStreaming) self.play();
	},

	onEndedHandler : function(){
	    var nextEpisode = self.getNextEpisodeNumber();
	    if ((nextEpisode != parseInt(self.activeEpisode.innerHTML)) && toBool(sessionStorage.isStreaming)){
	        self.runNewEpisode(nextEpisode);
	    }
	},

	getNextEpisodeNumber : function(){
	    if(self.hasNewEpisode()){
	    	return (parseInt(self.activeEpisode.innerHTML, 10) + 1);	
	    } 
	    return parseInt(self.activeEpisode.innerHTML, 10);
	},

	hasNewEpisode: function(){
	    return (parseInt(self.activeEpisode.innerHTML, 10) < self.episodes.length - EPISODES_LENGTH_OFFSET);
	},

	runNewEpisode : function(newEpisode){
	    if (document.fullscreenElement == self.videoDiv){
	        self.changeVideoPlayerContentTo(newEpisode);
	    }else {
	        self.changePageContentTo(newEpisode);
	    }
	},

	changeVideoPlayerContentTo : function(newEpisode){
	    self.changeEpisodeTo(newEpisode);
	    self.play();
	    self.setNewEpisode();
	    self.changeLabelTo(newEpisode);
	},

	changeEpisodeTo: function(episodeNumber){
		var srcToChange = self.videoPlayer.src;
	    var newSrc = self.changeEpisodeNumber(episodeNumber, srcToChange);
	    self.videoPlayer.src = newSrc;
	    self.videoPlayer.load();
	},

	formatAnimeNameToUrlValid: function (animeName){
		animeName = animeName.replace(new RegExp('\\s'), "-");
		return animeName;
	},

	changeEpisodeNumber: function(newEpisodeNumber, srcToChange){
		var name = self.formatAnimeNameToUrlValid(self.animeName.innerHTML);
	    var patt = new RegExp('((?:' + name + ')(?:[Ee]pisode){0,1}-)(\\d+)');	    
	    var validEpisodeNumber = self.toValidEpisodeNumberSrc(newEpisodeNumber);
	    var newSrc = srcToChange.replace(patt, '$1'+ validEpisodeNumber);
	    return newSrc;
	},

	play: function(){
	    self.videoPlayer.play();
	},

	setNewEpisode: function (){
		self.activeEpisode.removeAttribute('class');
		self.parentActiveEpisode = self.parentActiveEpisode.nextSibling;
		self.activeEpisode = self.parentActiveEpisode.firstChild;
		self.activeEpisode.className = "active";
	},

	changePageContentTo: function(newEpisode){
	    window.location.href = self.parentActiveEpisode.nextSibling.firstChild.href;
	},

	changeLabelTo: function(newEpisode){
	    self.episodeLabel.innerHTML = "Episode " + activeEpisode.innerHTML;
	},

	toValidEpisodeNumberSrc: function(episodeNumebr){
	    if (episodeNumebr < 10) return '0'+ episodeNumebr;
	    return episodeNumebr;
	}
};


function toBool(string){
	return string == "true";
}

videoControl.initialize();