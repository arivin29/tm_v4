const  electron = require("electron");
const  express = require("express");
const  app = express();
const  routes = require('./routers/indek');

const  fs = require('fs');
const  sql = require('sql.js');
const  filebuffer = fs.readFileSync('test.sqlite');


const  db = new sql.Database(filebuffer);

app.set('views', './views'); // specify the views directory
app.set('view engine', 'ejs');

//=======================
//soket.io
const  io = require('socket.io').listen(app.listen(5000));
/* Socket IO Start Over Here */
io.sockets.on('connection', function (socket) {
    socket.emit('message', {bt:'-00'});
    socket.emit('message','10');

        console.log('Client connected...');
    //socket.emit('message');
    socket.on('send', function (data) {
        console.log(data);
        io.sockets.emit('message', data);

        if(data.key_unik)
        {
            db.run("INSERT INTO db_kapal VALUES (?,?,?,?,?,?)", [data.id_kapal,data.no_induk,data.no_izin,data.nama_kapal,data.alat_tangkap,data.key_unik]);
            console.log("berhasil input db");
        }

        if(data.berat)
        {
            db.run("INSERT INTO db_timbang VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", [data.id_kapal , data.berat , data.id_user , data.nama_ikan , data.status_timbang , data.tanggal_timbang ,data.satuan , data.id_ikan , data.id_timbang , data.upi , data.faktor_a , data.faktor_b , data.id_timbang_detail , data.harga , data.keyUnik])
            console.log("berhasil input db");
        }

        if(data.list_kapal)
        {
            db.run("DELETE FROM db_kapal");
            kapal = data.list_kapal;
            for(i=0; i < data.list_kapal.length ; i++)
            {
                db.run("INSERT INTO db_kapal VALUES (?,?,?,?,?,?)", [kapal[i].id_kapal,kapal[i].no_induk,kapal[i].no_izin,kapal[i].nama_kapal,kapal[i].alat_tangkap,kapal[i].key_unik]);
            }
            console.log("berhasil simpan " + kapal.length );
        }

        if(data.list_timbang)
        {
            db.run("DELETE FROM db_timbang");
            timbang = data.list_timbang;
            for(i=0; i < data.list_timbang.length ; i++)
            {
                db.run("INSERT INTO db_timbang VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", [timbang[i].id_kapal , timbang[i].berat , timbang[i].id_user , timbang[i].nama_ikan , timbang[i].status_timbang , timbang[i].tanggal_timbang ,timbang[i].satuan , timbang[i].id_ikan , timbang[i].id_timbang , timbang[i].upi , timbang[i].faktor_a, timbang[i].faktor_b , timbang[i].id_timbang_detail , timbang[i].harga , timbang[i].keyUnik]);
            }
            console.log("berhasil simpan " + timbang.length );
        }




    });
});

///Helper Database============================================


// Execute some sql db_kapal
sqlstr = "CREATE TABLE db_kapal (id_kapal int, no_induk char, no_izin char,nama_kapal char,alat_tangkap char, key_unik char );";
db.run(sqlstr); // Run the query without returning anything


// Execute some sql db_kapal
sqlstr = "CREATE TABLE db_timbang (id_kapal int, berat int, id_user int, nama_ikan char, status_timbang int, tanggal_timbang char,satuan char, id_ikan int, id_timbang int, upi char, faktor_a char, faktor_b char, id_timbang_detail int, harga int, keyUnik char  );";
db.run(sqlstr); // Run the query without returning anything


app.use(function(req,res,next){
    req.db = db;
    next();
});

//========================
app.use('/', routes);
app.use(express.static('public'));


app.listen(3000, "0.0.0.0");
electron.app.on("ready", function () {
  var main = new electron.BrowserWindow({fullscreen:true});
  main.on("closed", electron.app.quit);
  main.webContents.openDevTools();
  main.loadURL("http://127.0.0.1:3000/");

});
