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

    var check = 0;

    $(document).on("click", "#follow_button", function(){
        if(check==0) {
            $("#follow_span").text("Unfollow");
            check=1;
            $(this).className = "profile_unfollow_user_button";
            // unlike it here
        }
        else {
            $("#follow_span").text("Follow");
            check = 0;
            $(this).className = "profile_follow_user_button";
           
            // like it here
        }
    });
})