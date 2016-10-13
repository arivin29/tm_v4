var express = require('express');
var router = express.Router();



// var electronSqlite = require('electron-sqlite');
// var sqlite3 = require('sqlite3').verbose();
// var db = new sqlite3.Database('mydb.db');
// var db = new electronSqlite.Database('mydb.db');

// db.run('CREATE TABLE lorem (info TEXT)');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/data_timbang/:key', function(req, res, next) {

    res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:3000');

     db =req.db;
    //  console.log(req.params.key);

     var stmt = db.prepare("SELECT count(id_ikan) as jml,* FROM db_timbang WHERE keyUnik=:key GROUP BY id_ikan");
     var result = stmt.getAsObject({':key':req.params.key});
    //  console.log(result); // Will print {a:1, b:'world'}

        var html = "<li></li>";
     stmt.bind({':key':req.params.key});
     while(stmt.step()) {
         var row = stmt.getAsObject();
         console.log(row);
         html+='<li>';
                html+='<div class="list-group-item">';
                   html+='<div class="row-action-primary">';
                       html+='<img src="images/fish.png"">';
                   html+='</div>';
                   html+='<div class="row-content">';
                       html+='<div class="least-content">'+ row.berat +' kg</div>';
                       html+='<div class="least-content total">Print</div>';
                       html+='<h4 class="list-group-item-heading">'+ row.nama_ikan +'</h4>';

                       html+='<p class="list-group-item-text">'+ row.tanggal_timbang +'</p>';
                   html+='</div>';
               html+='</div>';
            html+='</li>';
     }



     res.send(html);

});

module.exports = router;
