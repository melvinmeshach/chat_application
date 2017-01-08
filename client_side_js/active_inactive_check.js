
function doActiveUser(jsonResponse) {
  var user=jsonResponse.user;
   if(user==userName){
  active=true;
}
  else{
$("#"+user+"ActiveDot").css("background-color","green");
}
}

function doInActiveUser(jsonResponse) {
  var user=jsonResponse.user;
   if(user==userName){
  active=false;
}
  else{
    $("#"+user+"ActiveDot").css("background-color","orange");

}
}

function checkInActive(){
 interval=window.setInterval(function() {
 ws.send(JSON.stringify({'purpose':'inActiveUser','user':userName}));
}, 10000);
}




 function resetTimer(){
    if(!active){
      ws.send(JSON.stringify({'purpose':'activeUser','user':userName}));
    }
  clearInterval(interval);
  checkInActive();

 }
  function keydownEventHandler(){
  resetTimer();
  }


function mouseOverHandler() {
  resetTimer();
  }