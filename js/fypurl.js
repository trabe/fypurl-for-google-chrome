function restore_options() {
   $("friends").value = localStorage["friends"];
 }
 
function save_options() {
	localStorage["friends"] = $F("friends");
} 

function render_friends() {
	var friends = (localStorage["friends"] || "").split("\n").map(function(f) { return f.strip() }).reject(function(f) { return f.blank(); });
	
	if (friends.size() == 0) {
     	friend_fyps.hide();
		return;
   	}

	friends.each(function(friend) {
		var li = new Element("li");
		var a = new Element("a", { "href" : friend, "rel" : friend }).update(friend);
		a.observe("click", go_to_fyp.bindAsEventListener(a));
		li.appendChild(a);
		$('friend_fyps').appendChild(li);
	});
}
 
function go_to_fyp(event) {
   event.stop();
   chrome.tabs.create({url: "http://fypurl.com/" + this.href });
}
 
function fyp() {
	chrome.tabs.getSelected(null, function(tab) {
		window.open('http://fypurl.com/fyp_express?fyp_action=fyp_express&url='+encodeURIComponent(tab.url),'fyp_express_window','width=710,height=440,left=75,top=20,resizable=yes,scrollbars=yes');
		wyp_express_window.focus();
	});
 }
 
function unfyp() {
	window.open('http://fypurl.com/unfyp_express?fyp_action=unfyp_express','fyp_express_window','width=710,height=440,left=75,top=20,resizable=yes,scrollbars=yes');
    fyp_express_window.focus();      
}
