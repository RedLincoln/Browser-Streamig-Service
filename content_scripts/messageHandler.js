console.log('videoStreaming.js');

var messageControl = {

    initialize: function(){
        browser.runtime.onMessage.addListener(this.onMessageListener);
    },   
    
    onMessageListener: function(message, sender, sendResponse) {
        if (messageControl.isSync(message.data.command)){
            var data = messageControl.extractSyncPropertiesFrom(sessionStorage);
            sendResponse(data);    
        }else if(messageControl.isStreaming(message.data.command)){
            messageControl.changeStreaming();
        }else if(messageControl.isSkipingOpening(message.data.command)){
            messageControl.changeSkipOpening();
        }else if (messageControl.isSkipingEnding(message.data.command)){
            messageControl.changeSkipEnding();
        }
    },

    changeStreaming: function(){
        sessionStorage.isStreaming = !toBool(sessionStorage.isStreaming);
    },

    changeSkipOpening: function(){
        sessionStorage.isSkipingOpening = !toBool(sessionStorage.isSkipingOpening);
        sessionStorage.openingStart = 120;
        sessionStorage.openingEnd = 210;
    },

    changeSkipEnding: function(){
        sessionStorage.isSkipingEnding = !toBool(sessionStorage.isSkipingEnding);
        sessionStorage.endingStart = 1340;
        sessionStorage.endingEnd = videoPlayer.duration;
    },

    extractSyncPropertiesFrom: function(source){
        var result = {};
        var i;
        for (i = 0; i < syncPorperties.length; i++){
            result[syncPorperties[i]] = source[syncPorperties[i]];
        }
        return result;
    },

    isSync: function(command){
        return command === SYNC;
    },

    isStreaming: function(command){
        return command === STREAMING;
    },

    isSkipingOpening: function(command){
        return command === OPENING;
    },

    isSkipingEnding: function(command){
        return command === ENDING;
    },
};

messageControl.initialize();