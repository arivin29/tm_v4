
var tinggiLayar = $(window).height();
var lebarLayar = $(window).width();
var pengurang=100;
if(lebarLayar < 1300)
{
    pengurang=10;
    $('body').height(tinggiLayar - 5);
}
else {
    pengurang=100;
    $('body').height(tinggiLayar - 100);
}



var kapalInfo = document.getElementById('data-info');
var listKapalTimbang = document.getElementById('listKapalTimbang');


var kapalList = document.getElementById('kapalList');
// $(kapalInfo).height(tinggiLayar - 150);

$(listKapalTimbang).height(tinggiLayar - (pengurang+50));
$(kapalList).height(tinggiLayar - (pengurang));

new Optiscroll(listKapalTimbang, { forceScrollbars: false, maxTrackSize: 50, minTrackSize: 20 });
new Optiscroll(kapalList, { forceScrollbars: true });
// $('#listKapalTimbang').optiscroll();


function UlangLoadData()
{
    $('ul#kapalList li').click(function(event) {
        console.log("ambil data timbang");
        var val = $(this).attr('val');

        $('ul#kapalList li').removeClass("active");
        $(this).addClass("active");

        $('ul.listKapalTimbang').load(url + '/data_timbang/' + val);
    });
}
