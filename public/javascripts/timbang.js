var id_kapal = null;
var Datas;
var url = "http://localhost:3000";

window.onload = function() {
     var socket = io.connect('http://localhost:5000');
     socket.on('message',function(data){
       console.log(data);
         if(data.bt)
         {
             $('#beratTimbangan').html(Math.round(data.bt));
             $('#nama_timbangan').html(data.nama_timbangan);
         }
         else {
             Datas = data;
         }

         if(data.key_unik)
         {
              $('#nama_kapal').html(data.nama_kapal);
              $('#no_izin').html(data.no_izin);
              $('#alat_tangkap').html(data.alat_tangkap);
              $('#id_perusahaan').html("data.alat_tangkap");
              console.log("asdas");

                $('ul#kapalList li').removeClass("active");

              //doom ka list
              if(id_kapal != data.id_kapal)
              {
                  //id_kapal = data.id_kapal;
                  html='<li class="list-group-item no-padding" val=' + data.id_kapal +'>';

                      html+='<div class="row-content">';
                          html+='<div class="least-content">'+data.pemilik+'</div>';
                          html+='<h4 class="list-group-item-heading">'+data.nama_kapal+'</h4>';

                          html+='<p class="list-group-item-text">UPI:'+data.no_izin+' ('+data.alat_tangkap+')</p>';
                      html+='</div>';
                  html+='</li>';

                  $('ul#kapalList li:first-child').before(html);
              }


         }

         if(data.list_kapal)
         {
             $('ul#kapalList').html('<li></li>');

            //  html='<li></li>';
            //  $('ul#kapalList li:first-child').before(html);
             //id_kapal = data.id_kapal;

             kapal = Datas.list_kapal;
             for(i=0; i < Datas.list_kapal.length ; i++)
             {
                 html='<li class="list-group-item no-padding" val=' + kapal[i].key_unik +'>';

                     html+='<div class="row-content">';
                         html+='<div class="least-content">'+ kapal[i].pemilik +'</div>';
                         html+='<h4 class="list-group-item-heading">'+kapal[i].nama_kapal+'</h4>';

                         html+='<p class="list-group-item-text">UPI:'+kapal[i].no_izin+' ('+ kapal[i].alat_tangkap+')</p>';
                     html+='</div>';
                 html+='</li>';

                 $('ul#kapalList li:first-child').before(html);

             }
             UlangLoadData();

         }

         if(data.keyUnik)
         {
           html='<li>';
                  html+='<div class="list-group-item">';
                     html+='<div class="row-action-primary">';
                         html+='<img src="images/fish.png"">';
                     html+='</div>';
                     html+='<div class="row-content">';
                         html+='<div class="least-content">'+ data.berat +' kg</div>';
                         html+='<div class="least-content total">Print</div>';
                         html+='<h4 class="list-group-item-heading">'+ data.nama_ikan +'</h4>';

                         html+='<p class="list-group-item-text">'+ data.tanggal_timbang +'</p>';
                     html+='</div>';
                 html+='</div>';
              html+='</li>';

                $('ul.listKapalTimbang li:first-child').before(html);

                //update detail timbang
                $('#faktor_a').html(data.faktor_a);
                $('#faktor_b').html(data.faktor_b);
                $('#nama_ikan').html(data.nama_ikan);
                $('#harga_ikan').html(data.harga_ikan);


         }



     });
 }
