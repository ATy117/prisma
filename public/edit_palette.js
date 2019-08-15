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

    $(".palette_name_field").keypress(function(event){
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if(keycode == '13'){
            $("#palette_done_button").trigger("click");
        }
        //Stop the event from propogation to other handlers
        //If this line will be removed, then keypress event handler attached
        //at document level will also be triggered
        event.stopPropagation();
    });

    // $("#palette_randomize").click(function(){
    //     var min=1; 
    //     var max=50;  
    //     var random = Math.floor(Math.random() * (+max - +min)) + +min; 
    //     console.log(random);

    //     let larray = ["bright", "dark", "bright", "dark", "bright", "dark", "bright", "dark"];
    //     var lmin=0; 
    //     var lmax= larray.length;  
    //     var lrandom = Math.floor(Math.random() * (+lmax - +lmin)) + +lmin;

    //     let lumin;
    //     let hue;

    //     if (random == 1){
    //         hue = 'random';
    //         lumin = larray[lrandom];
    //         let randomColors = randomColor({
    //             luminosity: lumin,
    //             hue: hue,
    //             count: 5
    //         });
    //         $("#styleInput4").css("background-color",randomColors[0]);
    //         $("#styleInput3").css("background-color",randomColors[1]);
    //         $("#styleInput2").css("background-color",randomColors[2]);
    //         $("#styleInput1").css("background-color",randomColors[3]);
    //         $("#styleInput").css("background-color",randomColors[4]);
    //     } else {
    //         hue = '#' + Math.floor(Math.random()*16777215).toString(16);
    //         lumin = larray[lrandom];
    //         let randomColors = randomColor({
    //             luminosity: lumin,
    //             hue: hue,
    //             count: 5
    //         });
    //         $("#styleInput4").css("background-color",randomColors[0]);
    //         $("#styleInput3").css("background-color",randomColors[1]);
    //         $("#styleInput2").css("background-color",randomColors[2]);
    //         $("#styleInput1").css("background-color",randomColors[3]);
    //         $("#styleInput").css("background-color",randomColors[4]);
    //     }

        
    // });

};

function changeDetected(){
    $("#palette_done_button").removeClass("no_changes");
};