chrome.contextMenus.create({
							"documentUrlPatterns": ["http://*.elitesecurity.org/*"],
							"title": "Hide posts from same user", 
							"contexts":["all"],
                            "onclick": contextClicked});

function contextClicked(info, tab) {
	if(!lastUsername){
		alert('Post author not found.');
		return;
	}
	
	var ok = confirm("Hide posts from '" + lastUsername + "'?");
	if(!ok)
		return;
		
	var blockedUsernames = storage.blockedUsernames.get();	
	blockedUsernames[lastUsername] = "x";	
	storage.blockedUsernames.set(blockedUsernames);		

	// chrome.tabs.executeScript(tab.Id, {code: "location.reload();"});	
}

var lastUsername = "";

function dispatchRequest(request, sender, sendResponse){
	if (request.kind == "setLastUsername")
		processSetLastUsername(request.content);			
	else if (request.kind == "getBlockedUsernames")
		processGetBlockedUsernames(sendResponse);			
}

function sendUsageInfo(){	
	var data = {};
	data.userId = storage.userId.get();	
	data.blockedUsernames = storage.blockedUsernames.get();
	
	var stringData = "data=" + JSON.stringify(data);
	
	var xhr = new XMLHttpRequest();
	xhr.open("POST", "http://api.example.com/service", true);	
	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");	
	xhr.send(stringData);
}

function processGetBlockedUsernames(sendResponse){
	var result = storage.blockedUsernames.get();
	sendResponse(result); 
}

function processSetLastUsername(username){
	lastUsername = username;	
}

chrome.extension.onRequest.addListener(dispatchRequest);