$(document).ready(function(){
    var check = 0;
    $("#follow_button").click(function(){
        if (check==0){
            $("#follow_span").text("Unfollow");
            check = 1;
            //change class to -> follow_user_button_clicked
        } else{
            $("#follow_span").text("Follow");
            check = 0;
            //change class to -> follow_user_button_clicked
        }
        
    })
})