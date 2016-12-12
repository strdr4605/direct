var gcm = require('node-gcm');

// Set up the sender with your GCM/FCM API key (declare this once for multiple messages)
var sender = new gcm.Sender('AIzaSyBGZ7M9jm_LzYd7Pz5Csn1KyCHic3Gt2gg');

// Prepare a message to be sent
var message = new gcm.Message();

message.addNotification('title', 'Hello World!!!');
message.addNotification('body', 'Bitch');
// Specify which registration IDs to deliver the message to
var regTokens = ['APA91bEtcIxVkrOKm-ypm0fYjrFFuqki-T6th8tcgDgVaT3Ju5Oi5FB5NyjrZC0CY8oeuq2H618Gk9p1cFJLV5BH7ASpdPxcjLtYb4zg_UJo1zr-MD_1xvOcpMZf0QWPyBYaqRDVZJDs'];
console.log(message)
// Actually send the message
sender.send(message, { registrationTokens: regTokens }, function (err, response) {
    if (err) console.error(err);
    else console.log(response);
});
