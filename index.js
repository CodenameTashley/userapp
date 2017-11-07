"use strict";

var mysql = require('mysql');
var express = require('express');
var bodyParser = require('body-parser');
var _ = require('lodash');
var logger = require('morgan');
var app = express();
app.use(bodyParser.json());
app.use(logger('dev'));

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

// #region insertUsers
app.post('/users/', function (req, res) {
    console.log(req.ip);
    var query = "INSERT INTO `users`( `Name`, `Surname`, `Age`) VALUES ( \"" + req.body.name + "\", \"" + req.body.surname + "\", " + req.body.age + ")";
    con.query(query, function (err, result) {
        if (err)
            res.status(500).send(err);
        else
            res.status(200).send(result);
    });
});
// #endregion insertUsers

// #region getUsers

/* Get users under given conditions */
app.get('/users/', function (req, res) {
    console.log(req.ip);
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

/* Get a user by his ID */
app.get('/users/:id', function (req, res) {
    console.log(req.ip);
    con.query("SELECT * from users WHERE ID = " + req.params.id, function (err, result) {
        if (err)
            res.status(500).send(err);
        else
            res.status(200).send(result[0] || {});
    });
});

// #endregion getUsers

// #region updateUser

/* Update UserByID */
app.put('/users/:id', function (req, res) {
    console.log(req.ip);

    var query = "UPDATE users SET Name = \"" + req.body.name + "\", ";
    query += "Surname = \"" + req.body.surname + "\", ";
    query += "Age = " + req.body.age + " WHERE ID = " + req.params.id;

    con.query(query, function (err, result) {
        if (err)
            res.status(500).send(err);
        else
            res.status(200).send(result);
    });
});

// #endregion updateUser

// #region deleteUser

/* Delete UserByID or ArchiveByID*/

app.delete('/users/:id', function (req, res) {
    console.log(req.ip);

    var query;
    if (req.body.hasOwnProperty("archive")) {
        var query = "UPDATE users SET Archived ="  + req.body.archive;
    } else {
        query = "DELETE FROM users WHERE ID = " + req.params.id;
    }
    
    con.query(query, function (err, result) {
        if (err)
            res.status(500).send(err);
        else
            res.status(200).send(result);
    });
});

// #endregion deleteUser

// #region configs
app.use('/', function (req, res) {
    console.log(req.ip);
    res.send('Welcome to User Service!\n' + req.originalUrl);
});

var server = app.listen(9500, function () {
    var port = server.address().port
    console.log("App listening on port %s", port);
});
// #endregion configs