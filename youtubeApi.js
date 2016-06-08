(function(window, $){
    'use strict';

    var tag = document.createElement('script');

    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    window.onYouTubeIframeAPIReady = function() {
        $('iframe[src*="youtube.com"]').each(function(index, elem){
            var iframe = $(elem),
                uri = new URI(iframe.attr('src')),
                guid = createGuid(),
                player;

            uri.setQuery('enablejsapi', 1);

            iframe.attr('src', uri.href());
            iframe.attr('id', guid);

            player = new YT.Player(guid, {});

            iframe.data('player', player);

            createPauseButton(player).insertAfter(iframe);
            createPlayButton(player).insertAfter(iframe);
        });
    };

    function createGuid(){
        /* jshint ignore:start */
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
        /* jshint ignore:end */
    }

    function createPlayButton(player) {
        var button = $('<button type="button">Play</button>');

        button.on('click', function(){
            player.playVideo();
        });

        return button;
    }

    function createPauseButton(player) {
        var button = $('<button type="button">Pause</button>');

        button.on('click', function(){
            player.pauseVideo();
        });

        return button;
    }
})(window, jQuery);
