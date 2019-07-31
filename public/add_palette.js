window.onload = function(){
    $(".done_button").click(function(){
        let palette_name = $(".palette_name_field").val();

        if (!palette_name){
            console.log("Required");
            return;
        } else {
            console.log(palette_name);
        }
        
    });


};