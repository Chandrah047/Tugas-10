//Konfigurasi ke MySQL dan POST MAN
var https = require('http')
var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var mysql = require('mysql')

app.use(bodyParser.urlencoded({extends: false }));
app.use(bodyParser.json());

var conn = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "",
    database : "DbBarang"
})

//Create Table
conn.connect((err)=>{
    if(err)
    console.log("Problem with MySQL " + err);
    else
    console.log("Connected with Database");
    conn.query("CREATE TABLE Barang (Kodebarang INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY, NamaBarang VARCHAR (45) NOT NULL, Qty INT(5) NOT NULL, HargaBarang VARCHAR(10) NOT NULL)", (err, result)=>{
        if(err)
        console.log('Error Creating table ' + err)
        else
        console.log('Database created sucessfully')
    })
})


//Add Data
app.post('/Barang', (req, res)=>{
    var NamaBarang = req.body.NamaBarang
    var Qty = req.body.Qty
    var HargaBarang = req.body.HargaBarang
    var query = "INSERT INTO Barang (NamaBarang, Qty, HargaBarang) VALUES('"+ NamaBarang + "','" + Qty +"', '" + HargaBarang +"')"
    conn.query(query, (err, result)=> {
        if(err)
        res.json(err)
        else
        res.json(result)
    })
})


//Delete Data
app.delete('/Barang/:KodeBarang', (req, res)=>{
    var KodeBarang = req.params.KodeBarang
    var query = "Delete FROM Barang WHERE KodeBarang = " + KodeBarang
    conn.query(query, (err, result)=> {
        if(err)
        res.json(err)
        else
        res.json(result)
    })
})

//Update Data
app.put('/Barang/:KodeBarang', (req, res)=>{
    var KodeBarang = req.params.KodeBarang
    var NamaBarang = req.body.NamaBarang
    var Qty = req.body.Qty
    var HargaBarang = req.body.HargaBarang
    var query = "UPDATE Barang SET NamaBarang = '"+ NamaBarang + "', Qty ='" + Qty +"', HargaBarang = '" + HargaBarang +"' WHERE KodeBarang = " + KodeBarang
    conn.query(query, (err, result)=> {
        if(err)
        res.json(err)
        else
        res.json(result)
    })
})

//Tampil Data
app.get('/Barang', (req, res)=>{
    var query = "SELECT * FROM Barang LIMIT 2"
    conn.query(query, (err, rows)=>{
        res.json(rows)
    })
})

https.createServer(app)
.listen(8000, ()=>{
    console.log('Server is running on port 8000')
})