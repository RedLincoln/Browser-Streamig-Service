
var loadData = {

	defaultOpeningStart : timeFormatToSeconds("2:00"),
	defaultOpeningEnd: timeFormatToSeconds("3:30"),
	defaultEndingStart: timeFormatToSeconds("22:20"),
	defaultEndingEnd: videoPlayer.duration,
	defaultIsStreaming: true,
	defaultIsSkipingOpening: false,
	defaultIsSkipingEnding: false,

	initialize : function(){
		this.loadDefault();
	},

	loadDefault: function(){
        if (typeof sessionStorage.openingStart === 'undefined' ||
            !isValidStartEndTime(sessionStorage.openingStart, sessionStorage.openingEnd)) {
            
            sessionStorage.openingStart = this.defaultOpeningStart;
            sessionStorage.openingEnd = this.defaultOpeningEnd;
        }

        if (typeof sessionStorage.endingStart === 'undefined' || 
            !isValidStartEndTime(sessionStorage.endingStart, sessionStorage.endingEnd)){
            
            sessionStorage.endingStart = this.defaultEndingStart;
            sessionStorage.endingEnd = this.defaultEndingEnd;
        }

        if (typeof sessionStorage.isStreaming === 'undefined') {
        	sessionStorage.isStreaming = this.defaultIsStreaming;
        }

        if (typeof sessionStorage.isSkipingOpening === 'undefined'){
        	sessionStorage.isSkipingOpening = this.defaultIsSkipingOpening;
        }

        if (typeof sessionStorage.isSkipingEnding === 'undefined'){
        	sessionStorage.isSkipingEnding = this.defaultIsSkipingEnding;
        }
        
    },
};

loadData.initialize();
