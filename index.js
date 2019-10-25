const express = require('express');
const app = express();
const port = 3000;

app.get('/', function(req, res){ res.send('Hello World!');
});


var path = require('path');

app.get('/signIn', function(req, res){
    res.sendFile(path.join(__dirname + '/signIn.html'));
});


app.listen(port, function() { console.log(`Example app listening on port ${port}!`); 
});
