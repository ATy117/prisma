$(document).ready(function(){
    $(document).on("click", "#like_palette_id", function(){
        if($(this).attr("data-liked") == "liked") {
            $(this).attr("src","/assets/heartGray.png");
            $(this).attr("data-liked", "unliked");
            // unlike it here
        }
        else {
            $(this).attr("src","/assets/hearPink.png");
            $(this).attr("data-liked", "liked");
            // like it here
        }
    });

    $(".nav_search_form").submit(function(e){
        e.preventDefault();
    })
    $(".search_submit_button").click(function(){
        console.log("triggered");
    });
})