

function initiateChat(to){


	var isPresent=$.inArray(to, chatInitiatedArray);
	if(isPresent==-1){
	var newUserChatArea="<div class='"+to+"chat userchats'><div><span class='notifyUser' id='"+to+"notifyUser'></span><input type='text' autocomplete=\"off\" onkeyPress=notifyTyping(event,\'"+to+"\'); placeholder='Type your message here..' class='messageText' id='"+to+"message'><button id='sendButton' onclick=\"sendMessage('"+to+"')\";>Send</button></div></div>";
	var newUserHeader="<header onclick=\"hideShow('.userchats','"+to+"'); \" class="+to+"><label style='float: left;'>"+to+"</label><span onclick=\"endChat('"+to+"');\"><img src='./images/close.png'/></span></header>";
	$("#headerDiv").append(newUserHeader);
	$("#chatArea").append(newUserChatArea);
	chatInitiatedArray.push(to);
	setHeadersWidth();
	
}
	hideShow('.userchats',to);
/*	ws.addEventListener('notifyTyping',function (from) {
		$('#'+to+'notifyUser').text(from+" is typing");
		setTimeout(function(){ $('#'+to+'notifyUser').text(''); }, 3000);;
	});
	ws.addEventListener('globalNotifyTyping',function (from) {
		if(from!=userName){
		
		$('#GlobalnotifyUser').text(from+" is typing");
		}
		setTimeout(function(){ $('#GlobalnotifyUser').text(''); }, 3000);;
		});
		reloadKeyAndMouseListeners("document");
*/
}



function endChat(user){
var index = chatInitiatedArray.indexOf(user);
    if (index > -1) {
    chatInitiatedArray.splice(index, 1);
    }

    $('.'+user+'chat').remove();
    $('.'+user).remove();
    setHeadersWidth();
}
function endAllChats() {

	chatInitiatedArray.splice(0,availableUsersArray.length);
	  $('.userchats').remove();
    $('header').remove();



}