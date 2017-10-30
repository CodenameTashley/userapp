var mysql = require('mysql');
var express = require('express');
var bodyParser = require('body-parser');
var _ = require('lodash');
var app = express();
app.use(bodyParser.json());

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "people"
});

con.connect(function (err) {
    if (err)
        throw err;
    console.log("Connected!");
});

/* Get Users */
app.get('/users/', function (req, res) {
    var sQuery = "SELECT * from users WHERE 1";

    for (var keys in req.query) {
        sQuery += " AND " + keys + " = ";
        if (typeof (req.query[keys]) === "string") {
            sQuery += "\"" + req.query[keys] + "\"";
        }
    }

    con.query(sQuery, function (err, result) {
        if (err)
            res.status(500).send(err);
        else
            res.status(200).send(result);
    });
});

/* Get a user by Id */
app.get('/users/:id', function (req, res) {
    con.query("SELECT * from users WHERE Sr = " + req.params.id, function (err, result) {
        if (err)
            res.status(500).send(err);
        else
            res.status(200).send(result);
    });
});

/* Add User in table */
app.post('/users/', function (req, res) {
    console.log(req.body)

    var query = "INSERT INTO `users`( `Name`, `Surname`, `Age`) VALUES ( \"" + req.body.name + "\", \"" + req.body.surname + "\", " + req.body.age + ")";
    con.query(query, function (err, result) {
        if (err)
            res.status(500).send(err);
        else
            res.status(200).send(result);
    });

});

app.use('/', function (req, res) {
    res.send('Welcome to User Service!\n' + req.originalUrl);
});

var server = app.listen(9500, function () {

    var port = server.address().port
    console.log("App listening on port %s", port);

});