console.log("loadDefaultSessionData.js");

var loadData = {

	defaultOpeningStart : 120,
	defaultOpeningEnd: 210,
	defaultEndingStart: 1340,
	defaultEndingEnd: 1430,
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
