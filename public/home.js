window.onload = function(){
    let color1 = "#FFFFFF";
    let color2 = "#FFFFFF";
    let color3 = "#FFFFFF";
    let color4 = "#FFFFFF";
    let color5 = "#FFFFFF";
    
    $("#save_palette").click(async function(){
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
        let data = {};
        data.color1 = `#${color1}`;
        data.color2 = `#${color2}`;
        data.color3 = `#${color3}`;
        data.color4 = `#${color4}`;
        data.color5 = `#${color5}`;

        await $.post("/register/save_from_home", data, function (data, status){
            window.location.href = "/register";
        });
        
    });





};