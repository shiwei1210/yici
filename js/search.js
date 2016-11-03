$(function(){
	//滑动删除操作
	var myApp = new Framework7(); 
	var $$ = Dom7;	 
	/*$$('.action1').on('click', function () {
	     myApp.alert('确认删除？');	     
	});*/
	$(document).on('click','.action1',function () {
	     //myApp.alert('确认删除？');
	     $(this).parent().parent().remove();
	});
	$(document).on('click','.search-box>h5',function () {
	     //myApp.alert('确认删除？');
	     $(this).parent().html("");
	});
})
