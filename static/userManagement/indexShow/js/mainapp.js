
/**
 * Created by mac on 2017/2/21.
 */
$(document).ready(function(){
var heigt=$('.bannder').width()*554/1280;
    $('.bannder').height(heigt);
    var height2=$('.first').width()*728/1280;
    $('.first').height(height2);
    var height3=$('.second').width()*586/1280;
    $('.second').height(height3);


});

$(window).resize(function () {
    var heigt=$('.bannder').width()*554/1280;
    $('.bannder').height(heigt);

    var height2=$('.first').width()*728/1280;
    $('.first').height(height2);

    var height3=$('.second').width()*586/1280;
    $('.second').height(height3);
    console.log(height3)

})

