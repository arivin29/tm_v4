var id_kapal = null;
var Datas;
var url = "http://localhost:3000";

window.onload = function() {
     var socket = io.connect('http://localhost:5000');
     socket.on('message',function(data){
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

              //doom ka list
              if(id_kapal != data.id_kapal)
              {
                  //id_kapal = data.id_kapal;
                  html='<li class="list-group-item no-padding" val=' + data.id_kapal +'>';

                      html+='<div class="row-content">';
                          html+='<div class="least-content">01:00 12/09/2016</div>';
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
                         html+='<div class="least-content">01:00 12/09/2016</div>';
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

              console.log("asdassssssssssss");

              //doom ka list
            //   if(id_kapal != data.id_kapal)
            //   {
                  html='<li>';
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

                  $('ul.listKapalTimbang li:first-child').before(html);
              //}


         }
 


     });
 }
