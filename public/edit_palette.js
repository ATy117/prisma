window.onload = function(){
    $("#palette_done_button").click(function(){
        let palette_name = $(".palette_name_field").val();
        let color1 = $("#valueInput4").val();
        let color2 = $("#valueInput3").val();
        let color3 = $("#valueInput2").val();
        let color4 = $("#valueInput1").val();
        let color5 = $("#valueInput").val();

        if (!palette_name){
            console.log("Required");
            return;
        } else {
            date = moment().format("MMM DD, YYYY");

            let data = {};
            data.name = palette_name;
            data.color1 = color1;
            data.color2 = color2;
            data.color3 = color3;
            data.color4 = color4;
            data.color5 = color5;
            $.post("edit_process", data, function (data, success){
                if (data.message == "Success"){
                    window.location.href = data.redirect;
                }
            })
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



};