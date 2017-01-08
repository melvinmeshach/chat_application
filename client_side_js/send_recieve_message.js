
function sendMessage(to){
	var message=$("#"+to+"message").val();
	//$("."+to+"chat").append("<br><b>me:</b> "+message);
	ws.send(JSON.stringify({'purpose':'chatMessage','message':message,'from':userName,'to':to}));
	$("#"+to+"message").val('');
}

function doRecieveChatMessage(jsonResponse) {
	var from=jsonResponse.from;
	var to=jsonResponse.to;
	var message=jsonResponse.message;
	if(to=="Global"){
	initiateChat("Global");
	if(from!=userName){
	$(".Globalchat").append("<br><b>"+from+":</b> "+message);
	}
	else{
	$(".Globalchat").append("<br><b>Me:</b> "+message);
		
	}
	}
		else{
	if(from!=userName){

	initiateChat(from);
	$("."+from+"chat").append("<br><b>"+from+":</b> "+message);
	}
	else{
		console.log(to);
	$("."+to+"chat").append("<br><b>Me:</b> "+message);
	}
	}
}