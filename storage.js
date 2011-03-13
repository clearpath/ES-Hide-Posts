var storage = {};

storage.get = function(key, defaultValue) {
	var json = localStorage.getItem(key);
    if (json == null)
        return defaultValue;
		
    try {
        return JSON.parse(json);
    } catch (e) {
        console.log("Couldn't parse json (" + json + ") for " + key + ".");
        return defaultValue;
    }
}
 
storage.set = function(key, value) {
	localStorage.setItem(key, JSON.stringify(value));
}

storage.remove = function(key) {
    localStorage.removeItem(key);
}


storage.blockedUsernames = {};

storage.blockedUsernames.get = function() {
	return storage.get("blockedUsernames", {});	
}
 
storage.blockedUsernames.set = function(value) {
	storage.set("blockedUsernames", value);		
}


storage.userId = {};

storage.userId.get = function() {
	var result = storage.get("userId", "");	
	if(!result){
		result = guid.get();
		storage.set("userId", result);
	}
		
	return result;
}