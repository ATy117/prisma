$(document).ready(function(){
    // Get the modal
    var modal = document.getElementById("myModal_followers");
    var modal2 = document.getElementById("myModal_following");

    // When the user clicks on the button, open the modal 
    $("#followers_container").click(function(){
        modal.style.display = "block";
    })

    // When the user clicks on <span> (x), close the modal
    $("#close").click(function(){    
        modal.style.display = "none";
    })
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

     // When the user clicks on the button, open the modal 
     $("#following_container").click(function(){
        modal2.style.display = "block";
    })

    // When the user clicks on <span> (x), close the modal
    $("#close_following").click(function(){    
        modal2.style.display = "none";
    })
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal2) {
            modal2.style.display = "none";
        }
    }

    // The heart/unheart method
    $(document).on("click", "#like_palette_id", async function(){
        if($(this).attr("data-liked") == "liked") {
            // unlike it here
            let id = $(this).attr("data-id");
            let like = this;

            await $.post(`/social/unlike_palette/${id}`, function(data, status){
                if (data == "Success"){
                    $(like).attr("src","/assets/heartGray.png");
                    $(like).attr("data-liked", "unliked");
                    changeLikes(-1);
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
                    changeLikes(1);
                }
            });
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
                    follow.className = "profile_unfollow_user_button";
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
                    follow.className = "profile_follow_user_button";
                    $(follow).attr("data-following", "notfollowing");
                }
            });
        }
    });

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

    function changeLikes (value){
        let numString = $("#liked_count").text();
        let number = parseInt(numString, 10);

        number = number + value;

        $("#liked_count").text(number);
    };

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
    
    $(document).on("mouseover", "#color_1", function(){
        $(this).children("#color_1_hex").css("display", "flex");
    })

    $(document).on("mouseleave", "#color_1", function(){
        $(this).children("#color_1_hex").css("display", "none");
    })

    
    $(document).on("mouseover", "#color_2", function(){
        $(this).children("#color_2_hex").css("display", "flex");
    })

    $(document).on("mouseleave", "#color_2", function(){
        $(this).children("#color_2_hex").css("display", "none");
    })

    
    $(document).on("mouseover", "#color_3", function(){
        $(this).children("#color_3_hex").css("display", "flex");
    })

    $(document).on("mouseleave", "#color_3", function(){
        $(this).children("#color_3_hex").css("display", "none");
    })

    
    $(document).on("mouseover", "#color_4", function(){
        $(this).children("#color_4_hex").css("display", "flex");
    })

    $(document).on("mouseleave", "#color_4", function(){
        $(this).children("#color_4_hex").css("display", "none");
    })

    
    $(document).on("mouseover", "#color_5", function(){
        $(this).children("#color_5_hex").css("display", "flex");
    })

    $(document).on("mouseleave", "#color_5", function(){
        $(this).children("#color_5_hex").css("display", "none");
    })
})