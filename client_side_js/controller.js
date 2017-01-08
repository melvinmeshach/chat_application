var ws=new WebSocket('ws://letz-chat-here.herokuapp.com:5093');
var interval=null;
var active=true;
function controller(responseString){
		var jsonResponse=JSON.parse(responseString);
		var purpose=jsonResponse.purpose;
		switch(purpose){
			case 'loginSuccess':{
				doLoginSuccess(jsonResponse);
				break;
		}
			case 'loginFailed':{
				doLoginFailed();
				break;
			}

			case 'logoutSuccess':{
				doLogoutSuccess(jsonResponse);
				break;
			}
			case 'chatMessage':{
				doRecieveChatMessage(jsonResponse);
				break;
			}
			case 'activeUser':{
				doActiveUser(jsonResponse);
				break;
			}
			case 'inActiveUser':{
				doInActiveUser(jsonResponse);
				break;
			}
			
			case 'notifyTyping':{
				doNotifyTyping(jsonResponse);
				break;
			}		
	}
}