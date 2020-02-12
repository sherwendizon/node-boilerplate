var mysql=require('mysql');
var connection = mysql.createConnection({
  host     : '188.166.211.248',
  user     : 'devuser',
  password : 'zd3v!$qL#',
  database : 'database_master'
});

connection.connect(function(err) {
  if (err) {
    console.log("database_master connection error: " +err);
    throw err;
  }
  console.log("Connected!");
});

module.exports=connection;
