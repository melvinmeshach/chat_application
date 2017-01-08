function login(){
	userName=$('#nickName').val().trim();
	if(userName){
	ws.send(JSON.stringify({'purpose':'login','userName':userName}));
	ws.onmessage=function(responseString) {
	controller(responseString.data);
}
	}else{
	alert("Please enter a valid Nick Name");
}
}

function doLoginSuccess(jsonResponse) {
var message="";
		var from=jsonResponse.from;
		var users=jsonResponse.users;
		if(from==userName){

		addUser("Global");
		initiateChat("Global");
		message='<br>Welcome <b>'+from+'</b>' ;
		users.forEach(function(element){
			if(element!=userName){
				addUser(element);
			}
		});
		console.log("login success called");
		$('#nickNameDisp').append("<h5>NickName:</h5><div><label style='float:left;'>"+userName+"</label><label class='logout' onclick='logout();'>Logout</label></div><br>");

		$('#nickName').val('');
		$('#chat').css({display: 'block'});
		$('#loginPage').css({display: 'none'});
		//addListeners();
		reloadKeyAndMouseListeners(document);
		}
		else{
		message='<br>User <b>'+from+'</b> joined the chat room';
		addUser(from);
		
		$('.Globalchat').append(message);
		window.onbeforeunload = function() { 

	    logout();
	    };
		$('#loginError').html('');
		//initiateCheck();
		checkInActive();
}}
function doLoginFailed() {
	$('#loginError').html(userName+" name already taken please enter another name");
	$('#nickName').val('');
	
}

function logout() {
	ws.send(JSON.stringify({'purpose':'logout','user':userName}));

}

function doLogoutSuccess(jsonResponse) {
		var from=jsonResponse.user;
		if(from==userName){
	    $('#nickNameDisp').html('');
	endAllChats();
	$('#chat').css({display: 'none'});
	$('#loginPage').css({display: 'block'});
    removeAllAvailableusers();
    	$('#nickNameDisp').empty();

	//ws.removeAllListeners();	
		removeKeyAndMouseListener(document);
			
		}
		else{
		endChat(from);
		$('.Globalchat').append('<br>User <b>'+from+'</b> left the chat room');
    	removeAvailableuser(from);
   	
		}


}