/* 动态换算rem和px值  */
	    var rem =20;
	    window.onload = function () {
	        changeW();
	        window.addEventListener("resize", changeW, false);
	        function changeW() {
	            rem = 20 / 375 * document.documentElement.clientWidth;
	            document.documentElement.style.fontSize = rem + "px";
	        }
	        window.addEventListener("resize", changeW, false);
	    }
// 弹窗
function tanchuangShow(){
	$(".tanchuang").show().delay(2000).fadeOut(200);

}

//模态弹窗蒙层  阻止冒泡
$(".party-mengceng").on("click",function(){
	 return false;
})
