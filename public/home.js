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

    $("#palette_randomize").click(function(){
        var min=1; 
        var max=50;  
        var random = Math.floor(Math.random() * (+max - +min)) + +min; 

        let larray = ["bright", "dark", "bright", "dark", "bright", "dark", "bright", "dark"];
        var lmin=0; 
        var lmax= larray.length;  
        var lrandom = Math.floor(Math.random() * (+lmax - +lmin)) + +lmin;

        let lumin;
        let hue;

        if (random == 1){
            hue = 'random';
            lumin = larray[lrandom];
            let randomColors = randomColor({
                luminosity: lumin,
                hue: hue,
                count: 5
            });
            $("#red_display").css("background-color",randomColors[0]);
            $("#orange_display").css("background-color",randomColors[1]);
            $("#yellow_display").css("background-color",randomColors[2]);
            $("#green_display").css("background-color",randomColors[3]);
            $("#blue_display").css("background-color",randomColors[4]);
            $("#red_display_value").val(randomColors[0]);
            $("#orange_display_value").val(randomColors[1]);
            $("#yellow_display_value").val(randomColors[2]);
            $("#green_display_value").val(randomColors[3]);
            $("#blue_display_value").val(randomColors[4]);
        } else {
            hue = '#' + Math.floor(Math.random()*16777215).toString(16);
            lumin = larray[lrandom];
            let randomColors = randomColor({
                luminosity: lumin,
                hue: hue,
                count: 5
            });
            $("#red_display").css("background-color",randomColors[0]);
            $("#orange_display").css("background-color",randomColors[1]);
            $("#yellow_display").css("background-color",randomColors[2]);
            $("#green_display").css("background-color",randomColors[3]);
            $("#blue_display").css("background-color",randomColors[4]);
            $("#red_display_value").val(randomColors[0]);
            $("#orange_display_value").val(randomColors[1]);
            $("#yellow_display_value").val(randomColors[2]);
            $("#green_display_value").val(randomColors[3]);
            $("#blue_display_value").val(randomColors[4]);
        }

        
    });

};