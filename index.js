var http = require("http");
var express = require('express');
var app = express();
var mysql      = require('mysql');
var bodyParser = require('body-parser');

//start mysql connection
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'api-beweb'
});

connection.connect(function(err) {
  if (err) throw err
  console.log('MySql OK ! Enjoy avec ton code !')
})

app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({
  extended: true
}));

var server = app.listen(3000,  "127.0.0.1", function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Run sur http://%s:%s", host, port)

});

app.get('/', function (req, res) {
  res.sendFile(__dirname+'/index.html');
})

app.get('/films', function (req, res) {
   connection.query('select * from films', function (error, results, fields) {
    if (error) throw error;
    res.header('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');
	  res.end(JSON.stringify(results));
	});
});

app.get('/films/:id', function (req, res) {
   connection.query('select * from films where Id=?', [req.params.id], function (error, results, fields) {
    if (error) throw error;
    res.header('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');
	  res.end(JSON.stringify(results));
	});
});

app.post('/films', function (req, res) {
   var params  = req.body;
   console.log(params);
   connection.query('INSERT INTO films SET ?', params, function (error, results, fields) {
    if (error) throw error;
    res.header('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');
	  res.end(JSON.stringify(results));
	});
});

app.put('/films', function (req, res) {
   connection.query('UPDATE `films` SET `titre`=?,`description`=?,`jaquette`=?,`auteur`=?,`categorie`=? where `Id`=?', [req.body.Name,req.body.Address, req.body.Country, req.body.Phone, req.body.Id], function (error, results, fields) {
    if (error) throw error;
    res.header('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');
	  res.end(JSON.stringify(results));
	});
});

app.delete('/films', function (req, res) {

    let get_id = req.body.id;

    if (!get_id) {
        return res.status(400).send({ error: true, message: 'Please provide id' });
    }
    connection.query('DELETE FROM films WHERE id = ?', [get_id], function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'Deleted' });
    });
});

app.get('/categories', function (req, res) {
  connection.query('select categorie from films', function (error, results, fields) {
   if (error) throw error;
   res.header('Access-Control-Allow-Origin', '*');
   res.setHeader('Content-Type', 'application/json');
   res.end(JSON.stringify(results));
 });
});

app.get('/categories/:categorie', function (req, res) {
  connection.query('select * from films where categorie=?', [req.params.categorie], function (error, results, fields) {
   if (error) throw error;
   res.header('Access-Control-Allow-Origin', '*');
   res.setHeader('Content-Type', 'application/json');
   res.end(JSON.stringify(results));
 });
});

app.get('/auteur', function (req, res) {
  connection.query('select auteur from films', function (error, results, fields) {
   if (error) throw error;
   res.header('Access-Control-Allow-Origin', '*');
   res.setHeader('Content-Type', 'application/json');
   res.end(JSON.stringify(results));
 });
});

