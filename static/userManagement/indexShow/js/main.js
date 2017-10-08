
/**
 * Created by mac on 2017/2/21.
 */
$(document).ready(function(){


    var heigt=$('.bannder').width()*575/1280;
    $('.bannder').height(heigt);



});

$(window).resize(function () {
    var heigt=$('.bannder').width()*575/1280;
    $('.bannder').height(heigt);
    $('.bannder>img').height(heigt);

    console.log($('.bannder>img'));

})

