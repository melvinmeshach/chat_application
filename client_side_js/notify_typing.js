
function notifyTyping(e,to) { 
	var code = (e.keyCode ? e.keyCode : e.which);
if(code == 13) { 
	sendMessage(to);
}else{
  ws.send(JSON.stringify({'purpose':'notifyTyping','from': userName,'to':to}));
}
}
function doNotifyTyping(jsonResponse){
		var to=jsonResponse.to;
		var from=jsonResponse.from;
		if(from!=userName){
		if(to=="Global"){
		$('#GlobalnotifyUser').text(from+" is typing");
		setTimeout(function(){ $('#GlobalnotifyUser').text(''); }, 3000);;


		}
		else{
		$('#'+to+'notifyUser').text(from+" is typing");
		setTimeout(function(){ $('#'+to+'notifyUser').text(''); }, 3000);;

			}
}
}

function reloadKeyAndMouseListeners(element) {
		removeKeyAndMouseListener(element);
	 	$(element).on('keydown',keydownEventHandler);

		$(element).on('mousemove',mouseOverHandler);
	
}
function removeKeyAndMouseListener(element) {	
	$(element).off('keydown');
	$(element).off('mouseover');
	
}
