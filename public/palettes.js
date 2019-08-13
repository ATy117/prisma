
$(document).ready(function(){
    
    var modal = document.getElementById("myModal");

    // // Get the <span> element that closes the modal
    // var span = document.getElementsByClassName("delete_confirmation_button")[0];

    $(document).on("click", "#delete_button_id", function(){
        let parentdiv = $(this).parent().parent().parent();
        let palettename = $(parentdiv).attr("data-palette-name");
        let paletteID = $(parentdiv).attr("data-palette-id");

        $(".to-be-deleted").text(palettename);

        modal.style.display = "block";

        $("#confirm_button").unbind("click");

        $("#confirm_button").click(async function(){
            let path = `/palettes/${paletteID}/delete`;
            let data = {};

            await $.post(path, data, function(data, status){
                if (data =="Success"){
                    modal.style.display = "none";
                    $(parentdiv).remove();
                } 
            });
        });
        console.log(paletteID);
    });

    $(".edit_button").click(function(){
        let parentdiv = $(this).parent().parent().parent();
        let paletteID = $(parentdiv).attr("data-palette-id");
        
        let path = `/palettes/${paletteID}/edit`;
        window.location.href = path;
    });

    $("#cancel_button").click(function(){
        modal.style.display = "none";
    })

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

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


    // $("#color_1").mouseover(function(){
    //     $("#color_1_hex").css("display", "block");
    // })

    // $("#color_1").mouseleave(function(){
    //     $("#color_1_hex").hide();
    // })

    // $("#color_2").mouseover(function(){
    //     $("#color_2_hex").css("display", "block");
    // })

    // $("#color_2").mouseleave(function(){
    //     $("#color_2_hex").hide();
    // })
    // $("#color_3").mouseover(function(){
    //     $("#color_3_hex").css("display", "block");
    // })

    // $("#color_3").mouseleave(function(){
    //     $("#color_3_hex").hide();
    // })
    // $("#color_4").mouseover(function(){
    //     $("#color_4_hex").css("display", "block");
    // })

    // $("#color_4").mouseleave(function(){
    //     $("#color_4_hex").hide();
    // })
    // $("#color_5").mouseover(function(){
    //     $("#color_5_hex").css("display", "block");
    // })

    // $("#color_5").mouseleave(function(){
    //     $("#color_5_hex").hide();
    // })

    $(document).on("mouseover", "#color_1", function(){
        $("#color_1_hex").css("display", "flex");
    })

    $(document).on("mouseleave", "#color_1", function(){
        $("#color_1_hex").css("display", "none");
    })

    
    $(document).on("mouseover", "#color_2", function(){
        $("#color_2_hex").css("display", "flex");
    })

    $(document).on("mouseleave", "#color_2", function(){
        $("#color_2_hex").css("display", "none");
    })

    
    $(document).on("mouseover", "#color_3", function(){
        $("#color_3_hex").css("display", "flex");
    })

    $(document).on("mouseleave", "#color_3", function(){
        $("#color_3_hex").css("display", "none");
    })

    
    $(document).on("mouseover", "#color_4", function(){
        $("#color_4_hex").css("display", "flex");
    })

    $(document).on("mouseleave", "#color_4", function(){
        $("#color_4_hex").css("display", "none");
    })

    
    $(document).on("mouseover", "#color_5", function(){
        $("#color_5_hex").css("display", "flex");
    })

    $(document).on("mouseleave", "#color_5", function(){
        $("#color_5_hex").css("display", "none");
    })

})