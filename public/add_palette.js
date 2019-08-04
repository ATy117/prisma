window.onload = function(){
    $("#palette_done_button").click(function(){
        let palette_name = $(".palette_name_field").val();
        let color1 = $("#valueInput4").val();
        let color2 = $("#valueInput3").val();
        let color3 = $("#valueInput2").val();
        let color4 = $("#valueInput1").val();
        let color5 = $("#valueInput").val();
        let date;

        if (!palette_name){
            console.log("Required");
            return;
        } else {
            date = moment().format("MMM DD, YYYY");
            console.log(color1);
            console.log(color2);
            console.log(color3);
            console.log(color4);
            console.log(color5);
            console.log(date);
            console.log(palette_name);

            let data = {};
            data.name = palette_name;
            data.dateCreated = date;
            data.color1 = color1;
            data.color2 = color2;
            data.color3 = color3;
            data.color4 = color4;
            data.color5 = color5;
            $.post("/palettes/add_process", data, function (data, success){
                if (data.message == "Success"){
                    window.location.href = data.redirect;
                }
            })
        }
        
    });



};