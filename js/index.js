(function () {


    var now = {row: 1, col: 1}, last = {row: 0, col: 0};
    const towards = {up: 1, right: 2, down: 3, left: 4};
    var isAnimating = false;
    var pageLen = $(".page").length;


    document.onreadystatechange = subSomething;//当页面加载状态改变的时候执行这个方法.
    function subSomething() {
        if (document.readyState == 'complete') {
            //alert('complete!');
            //document.getElementById('app-loading').style.display = "none";
            $('#app-loading').addClass("ani-fadeOut");
            setTimeout(function () {
                $('#app-loading').hide();
            }, 800);
            $('.page-1-1').removeClass("hide");
            $('.page-1-1').addClass('page-current');

            //翻一屏
//		setTimeout(function(){
//			if (isAnimating) return;
//			last.row = now.row;
//			last.col = now.col;
//			if (last.row != 27) { now.row = last.row+1; now.col = 1; pageMove(towards.left);}
//				},1800);

        }

    }


//禁止默认touch事件
    document.addEventListener('touchmove', function (event) {
        event.preventDefault();
    }, false);

    $(document).swipeUp(function () {
        if (isAnimating) return;
        last.row = now.row;
        last.col = now.col;
        if (last.row != pageLen) {
            now.row = last.row + 1;
            now.col = 1;
            pageMove(towards.up);
        }
    })

    $(document).swipeDown(function () {
        if (isAnimating) return;
        last.row = now.row;
        last.col = now.col;
        if (last.row != 1) {
            now.row = last.row - 1;
            now.col = 1;
            pageMove(towards.down);
        }
    })

    $(document).swipeLeft(function () {
        if (isAnimating) return;
        last.row = now.row;
        last.col = now.col;
        //if (last.row>1 && last.row<5 && last.col==1) { now.row = last.row; now.col = 2; pageMove(towards.left);}
        //if (last.row != 27) { now.row = last.row+1; now.col = 1; pageMove(towards.left);}

    })

    $(document).swipeRight(function () {
        if (isAnimating) return;
        last.row = now.row;
        last.col = now.col;
        //if (last.row>1 && last.row<5 && last.col==2) { now.row = last.row; now.col = 1; pageMove(towards.right);}
        //if (last.row!=1) { now.row = last.row-1; now.col = 1; pageMove(towards.right);}
    })

//按钮跳转页面
//$('.btn-click').on('tap',function(){
//    if (isAnimating) return;
//	var Val = parseInt($(this).attr('val'));
//	//alert(val)
//    last.row = now.row;
//    last.col = now.col;
//    if (last.row != 28) { now.row = last.row + Val; now.col = 1; pageMove(towards.left);}
//})

//返回目录
//$('.side-btn').on('tap',function(){
//	if (isAnimating) return;
//    last.row = now.row;
//    last.col = now.col;
//    if (last.row != 28) { now.row = 3; now.col = 1; pageMove(towards.right);}
//})

//
// $('.planimg').on('tap',function(){
// 	$('.planimg').removeClass('ani-fadeIn2');
// 	if ( $(this).hasClass("showimg") ){
// 		$(this).removeClass('showimg');
// 		$(this).siblings('.planimg').addClass('showimg');
//
//
// 	}else {
// 		$(this).addClass('showimg');
// 		$(this).siblings('.planimg').removeClass('showimg');
// 	}
//
// })
//page10 changeImg
// $('.page-10-1 .img_2_01').on('tap',function(){
// 	$('.page-10-1 .img_4').attr('src','images/p10-04-01.png');
// });
// $('.page-10-1 .img_2_02').on('tap',function(){
// 	$('.page-10-1 .img_4').attr('src','images/p10-04-02.png');
// });
// $('.page-10-1 .img_2_03').on('tap',function(){
// 	$('.page-10-1 .img_4').attr('src','images/p10-04-03.png');
// });


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

})();


//ping
var gSound = 'images/bg_music.mp3';
var pop_up_note_mode = true;
var note_id = 1;

function $$(name) {
    return document.getElementById(name);
}
function switchsound() {
    au = $$('bgsound');
    ai = $$('sound_image');
    if (au.paused) {
        au.play();
        ai.src = "images/units-icons.png";
        pop_up_note_mode = true;
        popup_note();
        $$("music_txt").innerHTML = "打开";
        $$("music_txt").style.visibility = "visible";
        setTimeout(function () {
            $$("music_txt").style.visibility = "hidden"
        }, 2500);
    }
    else {
        pop_up_note_mode = false;
        au.pause();
        ai.src = "images/units-icons.png";
        $$("music_txt").innerHTML = "关闭";
        $$("music_txt").style.visibility = "visible";
        setTimeout(function () {
            $$("music_txt").style.visibility = "hidden"
        }, 2500);
    }
}

function on_pop_note_end(event) {
    note = event.target;

    if (note.parentNode == $$("note_box")) {
        $$("note_box").removeChild(note);
    }
}

function popup_note() {
    box = $$("note_box");

    note = document.createElement("span");
    note.style.cssText = "visibility:visible;position:absolute;background-image:url('images/musicalNotes.png');width:15px;height:25px";
    note.style.left = Math.random() * 20 + 20;
    note.style.top = "75px";
    this_node = "music_note_" + note_id;
    note.setAttribute("ID", this_node);
    note_id += 1;
    scale = Math.random() * 0.4 + 0.4;
    note.style.webkitTransform = "rotate(" + Math.floor(360 * Math.random()) + "deg) scale(" + scale + "," + scale + ")";
    note.style.webkitTransition = "top 2s ease-in, opacity 2s ease-in, left 2s ease-in";
    note.addEventListener("webkitTransitionEnd", on_pop_note_end);
    box.appendChild(note);

    setTimeout("document.getElementById('" + this_node + "').style.left = '0px';", 100);
    setTimeout("document.getElementById('" + this_node + "').style.top = '0px';", 100);
    setTimeout("document.getElementById('" + this_node + "').style.opacity = '0';", 100);

    if (pop_up_note_mode) {
        setTimeout("popup_note()", 600);
    }
}
function playbksound() {
    var audiocontainer = $$('audiocontainer');
    if (audiocontainer != undefined) {
        audiocontainer.innerHTML = '<audio id="bgsound" loop="loop" autoplay="autoplay" src="' + gSound + '" /> </audio>';
    }

    audio = $$('bgsound');
    audio.play();
    autoPlayMusic();


    sound_div = document.createElement("div");
    sound_div.setAttribute("ID", "cardsound");
    sound_div.style.cssText = "position:fixed;right:10px;top:20px;z-index:50000;visibility:visible;";
    sound_div.onclick = switchsound;
    if (document.body.offsetWidth > 400) {
        bg_htm = "<img id='sound_image' class='' src='images/units-icons.png'>";
        box_htm = "<div id='note_box' style='height:100px;width:44px;position:absolute;left:-20px;top:-80px'></div>";
    }
    else {
        bg_htm = "<img id='sound_image' width='30px' class='' src='images/units-icons.png'>";
        box_htm = "<div id='note_box' style='height:100px;width:44px;position:absolute;left:-5px;top:-80px'></div>";
    }
    txt_htm = "<div id='music_txt' style='color:white;position:absolute;left:-30px;top:10px;width:60px'></div>"
    sound_div.innerHTML = bg_htm + box_htm + txt_htm;
    document.body.appendChild(sound_div);
    setTimeout("popup_note()", 100);
}


// 音乐播放
function autoPlayMusic() {
    // 自动播放音乐效果，解决浏览器或者APP自动播放问题
    // function musicInBrowserHandler() {
    // 	musicPlay(true);
    // 	document.body.removeEventListener('touchstart', musicInBrowserHandler);
    // }
    // document.body.addEventListener('touchstart', musicInBrowserHandler);

    //自动播放音乐效果，解决微信自动播放问题
    function musicInWeixinHandler() {
        musicPlay(true);
        document.addEventListener("WeixinJSBridgeReady", function () {
            musicPlay(true);
        }, false);
        document.removeEventListener('DOMContentLoaded', musicInWeixinHandler);
    }

    document.addEventListener('DOMContentLoaded', musicInWeixinHandler);
}
function musicPlay(isPlay) {
    var media = audio;
    if (isPlay && media.paused) {
        media.play();
    }
    if (!isPlay && !media.paused) {
        media.pause();
    }
}






