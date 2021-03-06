var ws=createWebSocket();
var interval=null;
var active=true;
function createWebSocket() {
    var protocolPrefix = (window.location.protocol === 'https:') ? 'wss:' : 'ws:';
    return new WebSocket(protocolPrefix + '//' + location.host);
}
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