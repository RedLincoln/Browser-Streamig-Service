console.log('loading videoEndedControl.js');

var videoControl = {

	initialize : function () {
		videoPlayer.onended = this.onEndedHandler;
		if (sessionStorage.isStreaming) this.play();
	},

	onEndedHandler : function(){
	    var nextEpisode = videoControl.getNextEpisodeNumber();
	    if ((nextEpisode != parseInt(activeEpisode.innerHTML)) && toBool(sessionStorage.isStreaming)){
	        videoControl.runNewEpisode(nextEpisode);
	    }
	},

	getNextEpisodeNumber : function(){
	    if(this.hasNewEpisode()){
	    	return (parseInt(activeEpisode.innerHTML, 10) + 1);	
	    } 
	    return parseInt(activeEpisode.innerHTML, 10);
	},

	hasNewEpisode: function(){
	    return (parseInt(activeEpisode.innerHTML, 10) < episodes.length - EPISODES_LENGTH_OFFSET);
	},

	runNewEpisode : function(newEpisode){
	    if (document.fullscreenElement == videoDiv){
	        this.changeVideoPlayerContentTo(newEpisode);
	    }else {
	        this.changePageContentTo(newEpisode);
	    }
	},

	changeVideoPlayerContentTo : function(newEpisode){
	    this.changeEpisodeTo(newEpisode);
	    this.play();
	    this.setNewEpisode();
	    this.changeLabelTo(newEpisode);
	},

	changeEpisodeTo: function(episodeNumber){
		var srcToChange = videoPlayer.src;
	    var newSrc = this.changeEpisodeNumber(episodeNumber, srcToChange);
	    videoPlayer.src = newSrc;
	    videoPlayer.load();
	},

	formatAnimeNameToUrlValid: function (animeName){
		animeName = animeName.replace(new RegExp('\\s'), "-");
		return animeName;
	},

	changeEpisodeNumber: function(newEpisodeNumber, srcToChange){
		var name = this.formatAnimeNameToUrlValid(this.animeName.innerHTML);
	    var patt = new RegExp('((?:' + name + ')(?:[Ee]pisode){0,1}-)(\\d+)');	    
	    var validEpisodeNumber = this.toValidEpisodeNumberSrc(newEpisodeNumber);
	    var newSrc = srcToChange.replace(patt, '$1'+ validEpisodeNumber);
	    return newSrc;
	},

	play: function(){
	    videoPlayer.play();
	},

	setNewEpisode: function (){
		activeEpisode.removeAttribute('class');
		parentActiveEpisode = this.parentActiveEpisode.nextSibling;
		activeEpisode = this.parentActiveEpisode.firstChild;
		activeEpisode.className = "active";
	},

	changePageContentTo: function(newEpisode){
	    window.location.href = parentActiveEpisode.nextSibling.firstChild.href;
	},

	changeLabelTo: function(newEpisode){
	    episodeLabel.innerHTML = "Episode " + activeEpisode.innerHTML;
	},

	toValidEpisodeNumberSrc: function(episodeNumebr){
	    if (episodeNumebr < 10) return '0'+ episodeNumebr;
	    return episodeNumebr;
	}
};

videoControl.initialize();