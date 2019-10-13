console.log('loading loadDefaultSessionData.js');

var loadData = {

	defaultOpeningStart : digitalClockToSeconds("2:00"),
	defaultOpeningEnd: digitalClockToSeconds("3:30"),
	defaultEndingStart: digitalClockToSeconds("22:20"),
	defaultEndingEnd: videoPlayer.duration,
	defaultIsStreaming: true,
	defaultIsSkipingOpening: false,
	defaultIsSkipingEnding: false,

	initialize : function(){
		this.loadDefault();
	},

	loadDefault: function(){
        if (typeof sessionStorage.openingStart === 'undefined'){     
            sessionStorage.openingStart = this.defaultOpeningStart;
            sessionStorage.openingEnd = this.defaultOpeningEnd;
        }

        if (typeof sessionStorage.endingStart === 'undefined'){          
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
