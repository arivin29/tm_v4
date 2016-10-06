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

     var stmt = db.prepare("SELECT * FROM db_timbang WHERE keyUnik=:key GROUP BY id_timbang_detail");
     var result = stmt.getAsObject({':key':req.params.key});
    //  console.log(result); // Will print {a:1, b:'world'}

        var html = "<li></li>";
     stmt.bind({':key':req.params.key});
     while(stmt.step()) {
         var row = stmt.getAsObject();

         html+='<li>';
                html+='<div class="list-group-item">';
                   html+='<div class="row-action-primary">';
                       html+='<i class="material-icons">folder</i>';
                   html+='</div>';
                   html+='<div class="row-content">';
                       html+='<div class="least-content">820 kg</div>';
                       html+='<h4 class="list-group-item-heading">KAKAP MERAH</h4>';

                       html+='<p class="list-group-item-text">15:00/12/09/2016 | 14 kali timbang</p>';
                   html+='</div>';
               html+='</div>';
            html+='</li>';
     }



     res.send(html);

});

module.exports = router;
