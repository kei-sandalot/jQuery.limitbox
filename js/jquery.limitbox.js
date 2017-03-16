/* =================================*/
// jquery.limit.js - ver.1.0
// Lisence : MIT License
// Date : 2015/08/22
// Author : sand a lot
// Web : http://www.sandalot.com
// Mail : info@sandalot.com
// 
// jQuery plugin
// http://www.jquery.com
/* =================================*/

(function($){
    $.fn.limitbox = function( config ) {
        var now = new Date();

        var defaults = {
            id: 'limitbox',
            before: 'before text',
            after: 'after text',
            mode: 'bottom-right',
            x: 50,
            y: 50,
            year: now.getFullYear(),
            month: now.getMonth()+1,
            date: now.getDate(),
            hour: now.getHours(),
            minute: now.getMinutes(),
            fadeintime: 1.2
        }

        var options = $.extend( defaults, config );

        /* 一致した要素上で繰り返す */
        return this.each( function(i){
            var year = options.year;
            var month = options.month;
            var date = options.date;
            var hour = options.hour;
            var minute = options.minute;

            $("body").append('<div id="' + options.id + '"></div>');

            var element = $('#' + options.id);

            element.css({
                'display': 'none',
                'position': 'fixed',
                'margin': '0',
                'padding': '10px 20px',
                'border': '3px #FAA solid',
                'background-color': '#FFF',
                'box-shadow': '1px 1px 2px #AAA',
                'border-radius': '8px',
                'opacity': '0.9',
                'text-align': 'center'
            });

            var pos_base = options.mode.split("-");

            element.css( pos_base[0], options.y + 'px' );
            element.css( pos_base[1], options.x + 'px' );

            var limittime = new Date(year, month-1, date, hour, minute);
            var limittimestamp = Math.round( limittime / 1000 );

            var timeCheck = function() {
                var nowtimestamp = Math.round( new Date() / 1000 );
                var timeleft = limittimestamp - nowtimestamp;

                var html = "";
                if( timeleft > 0 ) {
                    html = options.before;
                } else {
                    html = options.after;
                }
                element.html( html );
            };

            var checkinterval = setInterval( timeCheck, 1000 * 60 );

            var checktimeout = setTimeout(
                function() {
                    timeCheck();
                    element.fadeIn();
                },
                options.fadeintime * 1000
            );
        });
    };

})(jQuery);



