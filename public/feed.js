$(document).on("click", "#like_palette_id", function(){
    $(this).toggleClass("like_palette_color");
    $(this).attr("src", "./assets//heart_pink.png");
})