window.onload = function(){
    let color1 = "#FFFFFF";
    let color2 = "#FFFFFF";
    let color3 = "#FFFFFF";
    let color4 = "#FFFFFF";
    let color5 = "#FFFFFF";
    
    $("#save_palette").click(function(){
        color1 = $("#red_display_value").val();
        color2 = $("#orange_display_value").val();
        color3 = $("#yellow_display_value").val();
        color4 = $("#green_display_value").val();
        color5 = $("#blue_display_value").val();
        console.log(color1);
        console.log(color2);
        console.log(color3);
        console.log(color4);
        console.log(color5);
    });





};