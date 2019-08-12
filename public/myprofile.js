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
            this.className = "profile_unfollow_user_button";
            $(this).attr("data-following", "following");
            // follow it here
        }
        else {
            $(this).children().text("Follow");
            this.className = "profile_follow_user_button";
            $(this).attr("data-following", "notfollowing");
            // unfollow it here
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
})