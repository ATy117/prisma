$(document).ready(function(){
    var check = 0;
    $("#follow_button").click(function(){
        if (check==0){
            $("#follow_span").text("Unfollow");
            check = 1;
            this.className = "unfollow_user_button";
            //change class to -> follow_user_button_clicked
        } else{
            $("#follow_span").text("Follow");
            check = 0;
            this.className = "follow_user_button";
            //change class to -> follow_user_button_clicked
        }
        
    })


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


})