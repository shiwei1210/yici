$(function () {
    //手机版菜单下滑
    $(".menu-li").on("click", function () {
        $(this).next().stop().slideToggle(500)
    });
    //规则指南详情下拉
    $(".rules-details-h5").on("click", function () {
        var rgb = $(this).css('color');
        if(rgb==="rgb(26, 141, 208)"){
            $(this).css('color','black');
        }else{
            $(this).css('color','rgb(26, 141, 208)');
        }
        if ($(this).children("span").hasClass("rules-details-span")) {
            $(this).children("span").removeClass("rules-details-span");
            $(this).children("span").addClass("rules-details-span1");
        }else{
            $(this).children("span").addClass("rules-details-span");
            $(this).children("span").removeClass("rules-details-span1");
        }
    });
    //手机版底部下拉
    $(".footer-h5").on("click", function () {
        if ($(this).children("span").hasClass("footer-bottom-span")) {
            $(this).children("span").removeClass("footer-bottom-span");
            $(this).children("span").addClass("footer-bottom-span1");
        }else{
            $(this).children("span").addClass("footer-bottom-span");
            $(this).children("span").removeClass("footer-bottom-span1");
        }
    })
});