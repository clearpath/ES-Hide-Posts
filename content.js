var es = {};

es.findUsername = function(postTable){
	var span = postTable.find('p.tiny span');
	if(!span)
		return "";
	
	span = span[0];
	if(!span)
		return "";
	
	return span.innerText; 
};

es.hidePostTables = function(blockedUsernames)  {	
	$('table.post').each(function(i){
		var postTable = $(this);
		for(var username in blockedUsernames){
			var postAuthor = es.findUsername(postTable)
			if(postAuthor == username){
				var fragment = '<p class="hidden">[+] ' + username + "</p>";
				fragment = $(fragment);	
				fragment.click(function(e){
					postTable.slideDown(function(){
						fragment.slideUp();
					});					
				});
				
				postTable.before(fragment);
				postTable.hide();
			}
		}
	});
}

es.hidePosts = function(){
	var request = {
					kind: "getBlockedUsernames",
					content: ""
   				  };
	chrome.extension.sendRequest(request, function(response){
		var blockedUsernames = response;
		es.hidePostTables(blockedUsernames);	
	}); 
}

$("body").mousedown(function(e){
	if(e.which != 3) // not right button
		return;
	
	var target = $(e.target);	
	var postTable = target.closest('table.post');
	if(!postTable)
		return;	
	
	var username = es.findUsername(postTable);
	var request = {
					kind: "setLastUsername",
					content: username
				};
	chrome.extension.sendRequest(request);    	
});
 
es.hidePosts();