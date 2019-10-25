const express = require('express');
const app = express();
const port = 3000;

app.get('/', function(req, res){ res.send('Hello World!');
});


var path = require('path');

app.get('/signIn', function(req, res){
	res.sendFile(path.join(__dirname + '/signIn.html'));
});

app.post('/tokenSignIn', function(req, res) { 
	const {OAuth2Client} = require('google-auth-library');
	const client = new OAuth2Client('857272623256-b3h70lf3tmb7dnorr7vkd9jsb6k8j7jp.apps.googleusercontent.com');
	async function verify() {
		const ticket = await client.verifyIdToken({
			idToken: req.body.idtoken,
			audience: '857272623256-b3h70lf3tmb7dnorr7vkd9jsb6k8j7jp.apps.googleusercontent.com',  // Specify the CLIENT_ID of the app that accesses the backend
		});
		const payload = ticket.getPayload();
		const userid = payload['sub'];
		const userEmail = payload['email'];
		if(userEmail == 'khoocassie72@gmail.com'){
			res.sendFile(path.join(__dirname + '/static/error.html'));
		}
		res.sendFile(path.join(__dirname +'/static/signedInSuccessfully.html'));
	}
	verify().catch(console.error);
});

app.listen(port, function() { console.log(`Example app listening on port ${port}!`); 
});
