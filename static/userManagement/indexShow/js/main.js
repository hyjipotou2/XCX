
/**
 * Created by mac on 2017/2/21.
 */
$(document).ready(function(){
var heigt=$('.bannder').width()*554/1280;
    $('.bannder').height(heigt);
    var height2=$('.first').width()*784/1280;
    $('.first').height(height2);
    var height3=$('.second').width()*636/1280;
    $('.second').height(height3);
     var height4=$('.third').width()*1282/1280;
    $('.third').height(height4);


});

$(window).resize(function () {
    var heigt=$('.bannder').width()*554/1280;
    $('.bannder').height(heigt);

   var height2=$('.first').width()*784/1280;
    $('.first').height(height2);

    var height3=$('.second').width()*636/1280;
    $('.second').height(height3);
    var height4=$('.third').width()*1282/1280;
    $('.third').height(height4);
    console.log(height3)

})

