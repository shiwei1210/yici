$(function(){
    /*视频播放*/
    $('.m_online').on('click', '>img', function () {
        $(this).addClass('active').next('video').addClass('active');
        var Media = document.getElementById('media');
        Media.play();
        var timer = setInterval(function () {
            if (Media.ended) {
                clearInterval(timer);
                $('.star_img').removeClass('active').next('video').removeClass('active');
            }
        }, 500);
        $('#media').on('click', function () {
            var _play = $(this).attr('data-play');
            if (_play == 'true') {
                $(this).attr('data-play', false);
                $('#media').trigger('pause');
                clearInterval(timer);
            } else {
                $(this).attr('data-play', true);
                $('#media').trigger('play');
                timer = setInterval(function () {
                    if (Media.ended) {
                        clearInterval(timer);
                        $('.star_img').removeClass('active').next('video').removeClass('active');
                    }
                }, 500);
            }
        });
    });
    $(".z-button").on("click",function(){
        if (confirm("确定要关闭程序？")) {
            if (typeof (window["jsWinform"]) != "undefined" && jsWinform != undefined && jsWinform != null)
                jsWinform.exitWinform();
        }
    })
});