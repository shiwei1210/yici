$(function () {
    //�ֻ���˵��»�
    $(".menu-li").on("click", function () {
        $(this).next().stop().slideToggle(500)
    });
    $(".rules-titleli").on("click", function () {
        $(this).children("div").stop().slideToggle(300)
    });
    //����ָ����������
    $(".rules-details-h5").on("click", function () {
        var rgb = $(this).css('color');
        if (rgb === "rgb(26, 141, 208)") {
            $(this).css('color', 'black');
        } else {
            $(this).css('color', 'rgb(26, 141, 208)');
        }
        if ($(this).children("span").hasClass("rules-details-span")) {
            $(this).children("span").removeClass("rules-details-span");
            $(this).children("span").addClass("rules-details-span1");
        } else {
            $(this).children("span").addClass("rules-details-span");
            $(this).children("span").removeClass("rules-details-span1");
        }
    });
    //�ֻ���ײ�����
    $(".footer-h5").on("click", function () {
        if ($(this).children("span").hasClass("footer-bottom-span")) {
            $(this).children("span").removeClass("footer-bottom-span");
            $(this).children("span").addClass("footer-bottom-span1");
        } else {
            $(this).children("span").addClass("footer-bottom-span");
            $(this).children("span").removeClass("footer-bottom-span1");
        }
    });
    /**/
    var $boxUl = $(".maket-tab").children("ul"), $boxLi = $boxUl.children("li");
    $boxLi.on("click", function () {
        var _index = $(this).index();
        $(this).addClass("maket-active").siblings().removeClass("maket-active");
        $(this).parent().nextAll().each(function (index, item) {
            index === _index ? $(item).css("display", "block") : $(item).css("display", "none");
        });
    });
    var $boxU1l = $(".fund-price-left").children("ul"), $boxLi1 = $boxU1l.children("li");
    $boxLi1.on("click", function () {
        var _index = $(this).index();
        $(this).addClass("fund-price-active").siblings().removeClass("fund-price-active");
        $(this).parent().nextAll().each(function (index, item) {
            index === _index ? $(item).css("display", "block") : $(item).css("display", "none");
        });
    });
    var $box = $(".tablebox").children("ul"), $boxL = $box.children("li");
    $boxL.on("click", function () {
        var _index = $(this).index();
        $(this).addClass("tableleft-active").siblings("li").removeClass("tableleft-active");
        $(this).parent().nextAll().each(function (index, item) {
            index === _index ? $(item).css("display", "block") : $(item).css("display", "none");
        });
    });
    var $xiala = $(".viede-aa");
    $xiala.on("click", function () {
        $(this).next().stop().slideToggle();
    })
    var $bp = $(".viede-jijin").children("p"), $viedeaa = $(".viede-aa");
    $bp.on("click", function () {
        var _index = $(this).index();
        $viedeaa.html($(this).html());
        $(this).parent().parent().nextAll("div").each(function (index, item) {
            index === _index ? $(item).css("display", "block") : $(item).css("display", "none");
        });
        $(this).parent().hide()
        console.log($(this).parent().nextAll("div"))
    });
    var $menua = $(".dl-menuwrapper li>a");
    $menua.on("click", function () {
        if ($(this).hasClass("menu-active1")) {
            $(this).removeClass("menu-active1");
        } else {
            $(this).addClass("menu-active").addClass("menu-active1").parent().siblings().children("a").removeClass("menu-active");
        }
    });
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
});

