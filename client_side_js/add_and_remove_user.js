


var availableUsersArray=new Array();
var chatInitiatedArray=new Array();
function hideShow(from,to){
		$('header').css('background-color', 'lightgrey');
		$(from).css('display','none');
		$('.'+to+'chat').css('display','block');
		$('.'+to).css('background-color', 'grey');
		$('.availableusers').css('background-color', 'white');
		$('.availableusers'+to).css('background-color', 'grey');
	}

function setHeadersWidth(){
	var chatWidth=100/chatInitiatedArray.length;
	$("header").css({
		width: chatWidth+"%"
	});
}

function addUser(user){
	availableUsersArray.push(user);
	if (user!="Global") {
	$("#availableUsersDiv").append("<label class='availableusers availableusers"+user+"'  onclick=\"initiateChat('"+user+"');\">"+user+"<span class='activeUsersDot' id='"+user+"ActiveDot'></span></label>");
	}
	else{
	$("#availableUsersDiv").append("<label class='availableusers availableusers"+user+"'  onclick=\"initiateChat('"+user+"');\">"+user+"</label>");
	}
}


function removeAllAvailableusers(){

	availableUsersArray.splice(0,availableUsersArray.length);

	$('.availableusers').remove();
}
function removeAvailableuser(user){
	
var index = availableUsersArray.indexOf(user);
    if (index > -1) {
    
	availableUsersArray.splice(index,1);
	}
	$('.availableusers'+user).remove();
}