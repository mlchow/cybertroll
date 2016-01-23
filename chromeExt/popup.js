document.addEventListener('DOMContentLoaded', function() {
  var trollButton = document.getElementById('trollbutton');
  trollButton.addEventListener('click', function() {
    console.log("here")
    var socket = io.connect('http://192.241.182.93:3000/');
    socket.emit('privmsg', {'to': 'eugene', 'msg':'hi'});
    socket.emit('chat message', 'hi all')
  });

  /* Update with your identity */
  var username = "evan";

  /* Get list of friends */
  var friends = httpGet('http://192.241.182.93:3000/getfriends/' + 
    username);
  updateFriendList(friends);
});

function httpGet(theUrl) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
  xmlHttp.send( null );
  return xmlHttp.responseText;
};

function updateFriendList(friends) {
	var parsedFriends = JSON.parse(friends);
	var numOnlineFriends = 0;

  parsedFriends.forEach(function(friend) {
      var currName = friend["name"];
      if (friend["online"]) { 
        $('#friendlist').append('<li>' + currName)
          .append('<input type="button" value="Troll" id=' +
            '\"' + 'friend_' + currName + '\"' +
            ' />')
          .append('</li>');

        /* Update # of friends */
        numOnlineFriends += 1;
        $('#numOnlineFriends').text(numOnlineFriends);

        /* Create listener for the button */
        $('#friend_' + currName).click( function() {
          friendTroll(currName);
        });
      }
  });
};

function friendTroll(target) {
  /* Send a signal to the server to troll a friend. */
  alert("Trolling " + target);
};