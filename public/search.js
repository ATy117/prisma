$(document).ready(function(){
    // var check = 0;
    // $("#follow_button").click(function(){
    //     if (check==0){
    //         $("#follow_span").text("Unfollow");
    //         check = 1;
    //         this.className = "unfollow_user_button";
    //         //change class to -> follow_user_button_clicked
    //     } else{
    //         $("#follow_span").text("Follow");
    //         check = 0;
    //         this.className = "follow_user_button";
    //         //change class to -> follow_user_button_clicked
    //     }
        
    // })

    $("#search_nav_palette").click(function(){
        if (!$(this).hasClass("bold_util")){
            $("#search_nav_user").toggleClass("bold_util");
            $(this).toggleClass("bold_util");
            //Show palette Results
            $(".search_indiv_palette").toggle();
            $(".search_user_results").toggle();
            //SHow Palette Header
            $("#palette_results_header").toggle();
            $("#user_results_header").toggle();
        }
    });

    $("#search_nav_user").click(function(){
        if (!$(this).hasClass("bold_util")){
            $("#search_nav_palette").toggleClass("bold_util");
            $(this).toggleClass("bold_util");
            //Show user results
            $(".search_indiv_palette").toggle();
            $(".search_user_results").toggle();
            //SHow User Header
            $("#palette_results_header").toggle();
            $("#user_results_header").toggle();
        }
    });

    
    $(document).on("mouseenter", "#follow_button", function(){
        if($(this).attr("data-following") == "following") {
            $(this).children().text("Unfollow");
        }
    });

    $(document).on("mouseleave", "#follow_button", function(){
        if($(this).attr("data-following") == "following") {
            $(this).children().text("Following");
        }
    });

    $(document).on("click", "#follow_button", function(){
        if($(this).attr("data-following") == "notfollowing") {
            $(this).children().text("Following");
            this.className = "unfollow_user_button";
            $(this).attr("data-following", "following");
            // follow it here
        }
        else {
            $(this).children().text("Follow");
            this.className = "follow_user_button";
            $(this).attr("data-following", "notfollowing");
            // unfollow it here
        }
    });

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