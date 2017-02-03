
var express = require('express');
var consolidate = require('consolidate');

var app = express();
var server = require('http').createServer(app);

//Create the AlchemyAPI object
var AlchemyAPI = require('./alchemyapi');
var alchemyapi = new AlchemyAPI();

// all environments
app.engine('dust',consolidate.dust);
app.set('views',__dirname + '/views');
app.set('view engine', 'dust');
app.set('port', process.env.PORT || 3000);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', example);



var port = process.env.PORT || 3000;
server.listen(port, function(){
	console.log('Express server listening on port ' + port);
	console.log('To view the example, point your favorite browser to: localhost:3000');
});


var demo_text = 'Sigmund Freud, the father of psychoanalysis, was a physiologist, medical doctor, psychologist and influential thinker of the early twentieth century. Working initially in close collaboration with Joseph Breuer, Freud elaborated the theory that the mind is a complex energy-system, the structural investigation of which is the proper province of psychology. He articulated and refined the concepts of the unconscious, infantile sexuality and repression, and he proposed a tripartite account of the mind’s structure—all as part of a radically new conceptual and therapeutic frame of reference for the understanding of human psychological development and the treatment of abnormal mental conditions. Notwithstanding the multiple manifestations of psychoanalysis as it exists today, it can in almost all fundamental respects be traced directly back to Freud’s original work.Freud’s innovative treatment of human actions, dreams, and indeed of cultural artifacts as invariably possessing implicit symbolic significance has proven to be extraordinarily fruitful, and has had massive implications for a wide variety of fields including psychology, anthropology, semiotics, and artistic creativity and appreciation. However, Freud’s most important and frequently re-iterated claim, that with psychoanalysis he had invented a successful science of the mind, remains the subject of much critical debate and controversy.';
//var demo_url = 'http://www.npr.org/2013/11/26/247336038/dont-stuff-the-turkey-and-other-tips-from-americas-test-kitchen';
//var demo_url = 'https://www.tutorialspoint.com/nodejs/';


var demo_url = 'https://apps.na.collabserv.com/wikis/home?lang=en-us#!/wiki/W9553d5e96be3_409d_a6f9_70406478d62e/page/App%20Dev%20for%20IBM%20Connections%20Cloud';
var demo_html = '<html><head><title>Node.js Demo | AlchemyAPI</title></head><body><h1>Did you know that AlchemyAPI works on HTML?</h1><p>Well, you do now.</p></body></html>';


function example(req, res) {
	var output = {};

	//Start the analysis chain
	entities(req, res, output);
}


function entities(req, res, output) {
	alchemyapi.entities('text', demo_text,{ 'sentiment':1 }, function(response) {
		output['entities'] = { text:demo_text, response:JSON.stringify(response,null,4), results:response['entities'] };
		keywords(req, res, output);
	});
}


function keywords(req, res, output) {
	alchemyapi.keywords('text', demo_text, { 'sentiment':1 }, function(response) {
		output['keywords'] = { text:demo_text, response:JSON.stringify(response,null,4), results:response['keywords'] };
		concepts(req, res, output);
	});
}


function concepts(req, res, output) {
	alchemyapi.concepts('text', demo_text, { 'showSourceText':1 }, function(response) {
		output['concepts'] = { text:demo_text, response:JSON.stringify(response,null,4), results:response['concepts'] };
		sentiment(req, res, output);
	});
}


function sentiment(req, res, output) {
	alchemyapi.sentiment('html', demo_html, {}, function(response) {
		output['sentiment'] = { html:demo_html, response:JSON.stringify(response,null,4), results:response['docSentiment'] };
		text(req, res, output);
	});
}


function text(req, res, output) {
	alchemyapi.text('url', demo_url, {}, function(response) {
		output['text'] = { url:demo_url, response:JSON.stringify(response,null,4), results:response };
		author(req, res, output);
	});
}


function author(req, res, output) {
	alchemyapi.author('url', demo_url, {}, function(response) {
		output['author'] = { url:demo_url, response:JSON.stringify(response,null,4), results:response };
		language(req, res, output);
	});
}


function language(req, res, output) {
	alchemyapi.language('text', demo_text, {}, function(response) {
		output['language'] = { text:demo_text, response:JSON.stringify(response,null,4), results:response };
		title(req, res, output);
	});
}


function title(req, res, output) {
	alchemyapi.title('url', demo_url, {}, function(response) {
		output['title'] = { url:demo_url, response:JSON.stringify(response,null,4), results:response };
		relations(req, res, output);
	});
}


function relations(req, res, output) {
	alchemyapi.relations('text', demo_text, {}, function(response) {
		output['relations'] = { text:demo_text, response:JSON.stringify(response,null,4), results:response['relations'] };
		category(req, res, output);
	});
}


function category(req, res, output) {
	alchemyapi.category('text', demo_text, {}, function(response) {
		output['category'] = { text:demo_text, response:JSON.stringify(response,null,4), results:response };
		feeds(req, res, output);
	});
}


function feeds(req, res, output) {
	alchemyapi.feeds('url', demo_url, {}, function(response) {
		output['feeds'] = { url:demo_url, response:JSON.stringify(response,null,4), results:response['feeds'] };
		microformats(req, res, output);
	});
}


function microformats(req, res, output) {
	alchemyapi.microformats('url', demo_url, {}, function(response) {
		output['microformats'] = { url:demo_url, response:JSON.stringify(response,null,4), results:response['microformats'] };
		taxonomy(req, res, output);
	});
}


function taxonomy(req, res, output) {
	alchemyapi.taxonomy('url', demo_url, {}, function(response) {
		output['taxonomy'] = { url:demo_url, response:JSON.stringify(response,null,4), results:response };
		combined(req, res, output);
	});
}

function combined(req, res, output) {
	alchemyapi.combined('url', demo_url, {}, function(response) {
		output['combined'] = { url:demo_url, response:JSON.stringify(response,null,4), results:response };
		image(req, res, output);
	});
}

function image(req, res, output) {
	alchemyapi.image('url', demo_url, {}, function(response) {
		output['image'] = { url:demo_url, response:JSON.stringify(response,null,4), results:response };
		image_keywords(req, res, output);
	});
}

function image_keywords(req, res, output) {
	alchemyapi.image_keywords('url', demo_url, {}, function(response) {
		output['image_keywords'] = { url:demo_url, response:JSON.stringify(response,null,4), results:response };
		res.render('example',output);
	});
}
