var http = require('http'),
    express = require('express'),
    app = express();

app.use(express.static(__dirname + '/public'));
    
app.set('views', __dirname + '/views');
app.set('view engine', 'jade')

app.get('/', function(req, res){
    res.render('index');
});

http.createServer(app).listen(process.env.PORT);