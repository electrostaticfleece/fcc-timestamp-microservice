var http = require('http'),
    express = require('express'),
    app = express();

app.use(express.static(__dirname + '/public'));
    
app.set('views', __dirname + '/views');
app.set('view engine', 'jade')

app.get('/', function(req, res){
    res.render('index');
});

app.get(/\/.*/, function(request, response) {
  var url = request.url.slice(1).replace(/\%20/g, " "),
      rtnDate = !isNaN(url) && isFinite(url) ?  new Date(Date.UTC(1970, 0, 1, 0, 0, 0, +url*1000)) : new Date(url),
      options = {year: 'numeric', month: 'long', day: 'numeric'},
      natural = (rtnDate == ('Invalid Date' || null)) ? null : rtnDate.toLocaleDateString('en-US', options),
      unixDate = !isNaN(url) ? Number(url) : (Date.parse(rtnDate)/1000 || null),
      dateObj = JSON.stringify({'unix': unixDate, 'natural': natural});

  response.end(dateObj);
});

http.createServer(app).listen(process.env.PORT);