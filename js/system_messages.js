var myApp = new Framework7();
 
var $$ = Dom7;
 
$$('.action1').on('click', function () {
  myApp.alert('Action 1');
});
$$('.action2').on('click', function () {
  myApp.alert('Action 2');
});