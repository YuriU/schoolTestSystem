var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var classes = require('./routes/classes');
var students = require('./routes/students');
var cors = require('cors')

var port = 3000;
var app = express();

app.use(cors());
// View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

//Set static folder
app.use(express.static(path.join(__dirname, 'client')));


// Body parser MW
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

// Angular DIST output folder
app.use(express.static(path.join(__dirname, './client/dist')));

app.use('/', index);
app.use('/api', classes);
app.use('/api', students);

app.listen(port, function(){
    console.log('Server started on port ' +port);
});