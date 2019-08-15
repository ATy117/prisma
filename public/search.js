$(document).ready(function(){

    $(".nav_search_form").submit(function(e){
        e.preventDefault();
    })
    $(".search_submit_button").click(function(){
        console.log("triggered");
        let query = $(".search_text_input").val();

        if (query){
            console.log("may query");
            window.location.href = `/search/${query}`;
        }
    });

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

    $(document).on("click", "#follow_button", async function(){
        if($(this).attr("data-following") == "notfollowing") {
            // follow it here
            let id = $(this).attr("data-id");
            let follow = this;

            await $.post(`/social/follow_account/${id}`, function(data, status){
                if (data == "Success"){
                    $(follow).children().text("Following");
                    follow.className = "unfollow_user_button";
                    $(follow).attr("data-following", "following");
                }
            });
        }
        else {
            // unfollow it here
            let id = $(this).attr("data-id");
            let follow = this;

            await $.post(`/social/unfollow_account/${id}`, function(data, status){
                if (data == "Success"){
                    $(follow).children().text("Follow");
                    follow.className = "follow_user_button";
                    $(follow).attr("data-following", "notfollowing");
                }
            });
        }
    });

    $(document).on("click", "#like_palette_id", async function(){
        if($(this).attr("data-liked") == "liked") {
            // unlike it here
            let id = $(this).attr("data-id");
            let like = this;

            await $.post(`/social/unlike_palette/${id}`, function(data, status){
                if (data == "Success"){
                    $(like).attr("src","/assets/heartGray.png");
                    $(like).attr("data-liked", "unliked");
                }
            });
        }
        else {
            // like it here
            let id = $(this).attr("data-id");
            let like = this;

            await $.post(`/social/like_palette/${id}`, function(data, status){
                if (data == "Success"){
                    $(like).attr("src","/assets/hearPink.png");
                    $(like).attr("data-liked", "liked");
                }
            });
        }
    });

    $(".search_text_input").keypress(function(event){
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if(keycode == '13'){
            $(".search_submit_button").trigger("click");
        }
        //Stop the event from propogation to other handlers
        //If this line will be removed, then keypress event handler attached
        //at document level will also be triggered
        event.stopPropagation();
    });

    $(".copy_icon").click(function(){
        let sibling = $(this).prev();
        let original_hex = $(sibling).text();

        //Copies
        var $temp = $("<textarea>");
        $("body").append($temp);
        $temp.val(original_hex).select();
        document.execCommand("copy");
        $temp.remove();

        //Future stuff pag naayos na ung look nito
        // Set Text to Copied!
        $(sibling).text("Copied!");

        setTimeout(function(){ 
            $(sibling).text(original_hex);
        }, 1500);
        

    });

    $(document).on("mouseover", "#color_1", function(){
        $(this).children("#color_1_hex").css("display", "flex");
        $(this).children("#copy_icon_id").css("display", "flex");
    })

    $(document).on("mouseleave", "#color_1", function(){
        $(this).children("#color_1_hex").css("display", "none");
        $(this).children("#copy_icon_id").css("display", "none");
    })

    
    $(document).on("mouseover", "#color_2", function(){
        $(this).children("#color_2_hex").css("display", "flex");
        $(this).children("#copy_icon_id").css("display", "flex");
    })

    $(document).on("mouseleave", "#color_2", function(){
        $(this).children("#color_2_hex").css("display", "none");
        $(this).children("#copy_icon_id").css("display", "none");
    })

    
    $(document).on("mouseover", "#color_3", function(){
        $(this).children("#color_3_hex").css("display", "flex");
        $(this).children("#copy_icon_id").css("display", "flex");
    })

    $(document).on("mouseleave", "#color_3", function(){
        $(this).children("#color_3_hex").css("display", "none");
        $(this).children("#copy_icon_id").css("display", "none");
    })

    
    $(document).on("mouseover", "#color_4", function(){
        $(this).children("#color_4_hex").css("display", "flex");
        $(this).children("#copy_icon_id").css("display", "flex");
    })

    $(document).on("mouseleave", "#color_4", function(){
        $(this).children("#color_4_hex").css("display", "none");
        $(this).children("#copy_icon_id").css("display", "none");
    })

    
    $(document).on("mouseover", "#color_5", function(){
        $(this).children("#color_5_hex").css("display", "flex");
        $(this).children("#copy_icon_id").css("display", "flex");
    })

    $(document).on("mouseleave", "#color_5", function(){
        $(this).children("#color_5_hex").css("display", "none");
        $(this).children("#copy_icon_id").css("display", "none");
    })


})