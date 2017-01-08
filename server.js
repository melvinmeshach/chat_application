/*var app = require('express')();*/
/*var http = require('http').Server(app);
var io = require('socket.io')(http);
*/var path = require('path');
var sockets=new Object();
var users=new Array();
/*var WebSocketServer = require('ws').Server, wss = new WebSocketServer({ port: 3000 });

*/



var server = require('http').createServer()
  , url = require('url')
  , WebSocketServer = require('ws').Server
  , wss = new WebSocketServer({ server: server })
  , express = require('express')
  , app = express()
  , port = process.env.PORT || 3000;


//var wsModule=require('ws').Sender;








app.get('/', function(req, res){
//	var express=require('express');
	app.use(express.static(path.join(__dirname)));
	res.sendFile('chat.html');
});



wss.on('connection', function(ws){ 
 //var userID = parseInt(ws.upgradeReq.url.substr(1), 10);
 //console.log(ws.upgradeReq.headers['sec-websocket-key']);
 
	console.log("new client connected");
	ws.on('message',function (requestString) {
		console.log("request String: "+requestString);
		var jsonRequest=JSON.parse(requestString);
		var purpose=jsonRequest.purpose;
		switch(purpose){
			case "login":
			{
			var userName=jsonRequest.userName;
			var isPresent=users.indexOf(userName);
			if(isPresent>=0){
				ws.send(JSON.stringify({'purpose':'loginFailed'}));
			}else{
		users.push(userName);
		sockets[userName]=ws;
	 	for(var key in sockets){
	 	sockets[key].send(JSON.stringify({'purpose':'loginSuccess','from':userName,'users':users}));
	}
    console.log("Available users after login: "+users);
    console.log("Available sockets after login: "+sockets);
	}
		break;
	}
		case 'logout':
		{
			var from=jsonRequest.user;
			var index = users.indexOf(from);
	    	if (index > -1) {
	    	users.splice(index,1);
	    		for (var key in sockets) {
 				sockets[key].send(JSON.stringify({'purpose':'logoutSuccess','user':from}));
			
		}	
	    	delete sockets[from];
	    	console.log("A client left");
	    	console.log("Available users after logout: "+users);
	    	console.log("Available sockets after logout: "+sockets);
			}

			break;
		}
		case 'chatMessage':
		{	var to=jsonRequest.to;
			var from=jsonRequest.from;
			var message=jsonRequest.message;
				console.log("message came");
			if(to=="Global"){
				for (var key in sockets) {
 				
 				sockets[key].send(JSON.stringify({'purpose':'chatMessage','message':message,'from':from,'to':to}));
			
		}
		}
			else{
				var toSocket=sockets[to];
				var fromSocket=sockets[from];
				toSocket.send(JSON.stringify({'purpose':'chatMessage','message':message,'from':from,'to':to}));
				fromSocket.send(JSON.stringify({'purpose':'chatMessage','message':message,'from':from,'to':to}));
			
		}
			break;
		}
		case 'inActiveUser':
		{	
			var user=jsonRequest.user;
			for (var key in sockets) {

		  	sockets[key].send(JSON.stringify({'purpose':'inActiveUser','user': user}));
  			}
  			break;
		}
		case 'activeUser':
		{
			var user=jsonRequest.user;
			for (var key in sockets) {

		  	sockets[key].send(JSON.stringify({'purpose':'activeUser','user': user}));
  			}
  			break;
  		}
  		case 'notifyTyping':
		{
			var from=jsonRequest.from;
			var to=jsonRequest.to;
		if(to=="Global"){
				for (var key in sockets) {
					sockets[key].send(JSON.stringify({'purpose':'notifyTyping','from':from,'to':to}));
				}
		}
		else{
			var toSocket=sockets[to];
			toSocket.send(JSON.stringify({'purpose':'notifyTyping','from':from,'to':to}));
		}
	
		break;
	}
	}
});
});








/*wss.on('connection', function(ws){ 
	console.log("new client added");
	ws.send("welcome");

	ws.on('login',function(from){
	var isPresent=users.indexOf(from);
	if(isPresent>=0){
		wss.to(ws.id).emit('loginFailed',from);
	}else{
		users.push(from);
	sockets[from]=ws.id;
	


		wss.emit('loginSucess',from,users);
	
    console.log("Available users after login: "+users);
    console.log("Available sockets after login: "+JSON.stringify(sockets));
	}
	});
	ws.on('logout',function(from){
		var index = users.indexOf(from);
    if (index > -1) {
    users.splice(index,1);
    delete sockets[from];
    wss.emit('logoutSuccess',from);
    console.log("Available users after logout: "+users);
    console.log("Available sockets after logout: "+JSON.stringify(sockets));
	}

	});
	ws.on('chatMessage',function(message,from,to){
		console.log("message came");
		if(to=="Global"){
			wss.emit('globalChatMessage',message,from);
		}
			else{console.log(message);
		wss.to(sockets[to]).emit("chatMessage", message,from);
	}});
	ws.on('notifyTyping',function(from,to){
		if(to=="Global"){
		wss.emit('globalNotifyTyping',from);
			
		}
		else{
		wss.to(sockets[to]).emit('notifyTyping',from);
		}
	});
	
  ws.on('activeUser', function(user){
    wss.emit('activeUser', user);
  });

  ws.on('inActiveUser', function(user){
    wss.emit('inActiveUser', user);
  });
});
*/server.on('request', app);
server.listen(port, function () { console.log('Listening on ' + server.address().port) });

