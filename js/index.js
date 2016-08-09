(function () {

    //点击产品标题展开产品列表
    $(".show-btn").on("click", function () {
        $(this).find("em").toggleClass("on");
        if ($(this).find("em").hasClass("on")) {
            $(this).siblings(".product-list").addClass("visiable");
        }
        else {
            $(this).siblings(".product-list").removeClass("visiable");
        }
    });

    var now = {row: 1, col: 1}, last = {row: 0, col: 0};
    const towards = {up: 1, right: 2, down: 3, left: 4};
    var isAnimating = false;

    
    document.onreadystatechange = subSomething;//当页面加载状态改变的时候执行这个方法.
    function subSomething() {
        if (document.readyState == 'complete') {
            $('#app-loading').addClass("ani-fadeOut");
            setTimeout(function () {
                $('#app-loading').hide();
            }, 800);
            $('.page-1-1').removeClass("hide");
            $('.page-1-1').addClass('page-current');

            //禁止默认touch事件
            document.addEventListener('touchmove', function (event) {
                event.preventDefault();
            }, false);
            var _flag = document.getElementById('index');
            if(_flag){
                $(document).swipeUp(function () {
                    if (isAnimating) return;
                    last.row = now.row;
                    last.col = now.col;
                    var pageLen = $(".page").length;
                    if (last.row != pageLen) {
                        now.row = last.row + 1;
                        now.col = 1;
                        pageMove(towards.up);

                    }

                    if (last.row == pageLen - 1) {
                        $('.trasfrm').removeClass('ds768')
                    }
                });

                $(document).swipeDown(function () {
                    if (isAnimating) return;
                    last.row = now.row;
                    last.col = now.col;
                    if (last.row != 1) {
                        now.row = last.row - 1;
                        now.col = 1;
                        pageMove(towards.down);
                    }
                    if (last.row == 5) {
                        $('.trasfrm').addClass('ds768')
                    }
                });

                $(document).swipeLeft(function () {
                    if (isAnimating) return;
                    last.row = now.row;
                    last.col = now.col;
                });

                $(document).swipeRight(function () {
                    if (isAnimating) return;
                    last.row = now.row;
                    last.col = now.col;
                    //if (last.row>1 && last.row<5 && last.col==2) { now.row = last.row; now.col = 1; pageMove(towards.right);}
                    //if (last.row!=1) { now.row = last.row-1; now.col = 1; pageMove(towards.right);}
                });


                $(document).on("gonext", function (e) {
                    last.row = now.row;
                    last.col = now.col;
                    if (last.row != 5) {
                        now.row = last.row + 1;
                        now.col = 1;
                        pageMove(towards.up);
                    }
                }).on("goprew", function (e) {
                    last.row = now.row;
                    last.col = now.col;
                    if (last.row != 1) {
                        now.row = last.row - 1;
                        now.col = 1;
                        pageMove(towards.down);
                    }
                });

                function pageMove(tw) {
                    var lastPage = ".page-" + last.row + "-" + last.col,
                        nowPage = ".page-" + now.row + "-" + now.col;

                    switch (tw) {
                        case towards.up:
                            outClass = 'pt-page-moveToTop';
                            inClass = 'pt-page-moveFromBottom';
                            break;
                        case towards.right:
                            outClass = 'pt-page-moveToRight';
                            inClass = 'pt-page-moveFromLeft';
                            break;
                        case towards.down:
                            outClass = 'pt-page-moveToBottom';
                            inClass = 'pt-page-moveFromTop';
                            break;
                        case towards.left:
                            outClass = 'pt-page-moveToLeft';
                            inClass = 'pt-page-moveFromRight';
                            break;
                    }
                    isAnimating = true;
                    $(nowPage).removeClass("hide");

                    $(lastPage).addClass(outClass);
                    $(nowPage).addClass(inClass);

                    setTimeout(function () {
                        $(lastPage).removeClass('page-current');
                        $(lastPage).removeClass(outClass);
                        $(lastPage).addClass("hide");
                        $(lastPage).find(".img").addClass("hide");
                        $(lastPage).find(".divimg").addClass("hide");

                        $(nowPage).addClass('page-current');
                        $(nowPage).removeClass(inClass);
                        $(nowPage).find(".img").removeClass("hide");
                        $(nowPage).find(".divimg").removeClass("hide");

                        isAnimating = false;
                    }, 600);
                }
            }
        }
    }
    setTimeout(function(){
        $('.main-box>img').addClass('active');
    },4500);
    setTimeout(function(){
        $('.con-box').addClass('active');
    },4800);
    var _wheelbox = document.getElementById('wheelbox');
    if(_wheelbox){
        $(function() {
            /*Zepto(function($){
              $('.pop-grayzg').addClass('active');
            });*/
            var start = setInterval(function(){
                var $rotate = $('.rotate');
                if($rotate.hasClass('active')){
                    $rotate.removeClass('active');
                }else{
                    $rotate.addClass('active');
                }
            },800);
            var $box = $('.wheelbox'),
                $cont = $('.rotate-cont');
            $box.height($cont.height());
            $(window).resize(function(){
                $box.height($cont.height());
            });
            var deg = 0;
            var old_p_idx = 0;
            var prize = ["手机充值100元",  "小米充电宝", "2000积分", "11件工具箱", "洁玉毛巾简逸", "30积分","迪斯尼双人门票与酒店标准间", "50积分","iphone6s 64G", "迪斯尼门票"];
            $(".rotate-arrow-text").on('click','img',function() {
                /*var _self = $(this);
                //锁定按钮
                if (_self.hasClass("act")) {
                    return false;
                }
                _self.addClass('act');*/
                var new_p_idx = Math.floor(Math.random() * 10); //奖品索引
                deg += 1440;
                deg += (new_p_idx - old_p_idx) * 36;
                old_p_idx = new_p_idx;
                $(".arrow-img").css({
                    "-webkit-transform": "rotate(" + deg + "deg)",
                    "transform": "rotate(" + deg + "deg)"
                });
                
                setTimeout(function() {
                    clearInterval(start);
                    //_self.removeClass('act');
                    showModal(0);
                    $('.t-huo').text('获得'+prize[new_p_idx]);
                    
                }, 4000);
            });
            function showModal(id){
                var _url = (location.search).substring(1),_index = -1,_id = 1;
                if(id != undefined){
                    _id = id;
                    console.log('first');
                }else{
                    if(_url.indexOf('&') != -1){
                        _index = _url.indexOf('&');
                        _id = _url.substring(_url.indexOf('=')+1,_index);
                    }else{
                        if(_url.indexOf('=') != -1){
                            _id = _url.substring(_url.indexOf('=')+1);
                        }
                    }
                }
                $('.pop-grayzg').addClass('active');
                $('.okeveningu-pop>div').eq(_id).addClass('active').siblings().removeClass('active');
            }
            $('.pop-grayzg>.okeveningu-pop button,.okright').on('click',function(){
                $('.pop-grayzg').removeClass('active');
            });
            $('#recive').on('click',function(){
                location.href = './notice.html';
            });
            if((location.search).indexOf('?') != -1){
                showModal();
            }
        });
    } 

})();
