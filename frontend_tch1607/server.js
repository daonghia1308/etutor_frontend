var express = require('express');
var port = process.env.PORT || 8080
app = express();

app.use(express.static(__dirname + "/dist/"));
app.listen(port);
console.log('server started '+ port);