const express 	 = require("express"),
	  bodyParser = require("body-parser"),
	  path 		 = require("path"),
	  app 		 = express(),
	  port 		 = 3000;

app.use(bodyParser.json({    
    limit: '1024mb'}));

app.use(bodyParser.urlencoded({    
    limit: '1024mb',    
    extended: false}));

app.use(express.static(path.join(__dirname, "public")));

app.use(express.static(path.join(__dirname + "index.html")));

app.listen(port, () => {
	console.log(`App listen on ${port} port`);
});

