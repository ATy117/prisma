
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

    $(".copy_icon").click(function(){
        let sibling = $(this).prev();
        let original_hex = $(sibling).text();

        //Copies
        var $temp = $("<textarea>");
        $("body").append($temp);
        $temp.val(original_hex).select();
        document.execCommand("copy");
        $temp.remove();

        //Future stuff pag naayos na ung look nito
        // Set Text to Copied!
        $(sibling).text("Copied!");

        setTimeout(function(){ 
            $(sibling).text(original_hex);
        }, 1500);
        

    });

    $(document).on("mouseover", "#color_1", function(){
        $(this).children("#color_1_hex").css("display", "flex");
        $(this).children("#copy_icon_id").css("display", "flex");
    })

    $(document).on("mouseleave", "#color_1", function(){
        $(this).children("#color_1_hex").css("display", "none");
        $(this).children("#copy_icon_id").css("display", "none");
    })

    
    $(document).on("mouseover", "#color_2", function(){
        $(this).children("#color_2_hex").css("display", "flex");
        $(this).children("#copy_icon_id").css("display", "flex");
    })

    $(document).on("mouseleave", "#color_2", function(){
        $(this).children("#color_2_hex").css("display", "none");
        $(this).children("#copy_icon_id").css("display", "none");
    })

    
    $(document).on("mouseover", "#color_3", function(){
        $(this).children("#color_3_hex").css("display", "flex");
        $(this).children("#copy_icon_id").css("display", "flex");
    })

    $(document).on("mouseleave", "#color_3", function(){
        $(this).children("#color_3_hex").css("display", "none");
        $(this).children("#copy_icon_id").css("display", "none");
    })

    
    $(document).on("mouseover", "#color_4", function(){
        $(this).children("#color_4_hex").css("display", "flex");
        $(this).children("#copy_icon_id").css("display", "flex");
    })

    $(document).on("mouseleave", "#color_4", function(){
        $(this).children("#color_4_hex").css("display", "none");
        $(this).children("#copy_icon_id").css("display", "none");
    })

    
    $(document).on("mouseover", "#color_5", function(){
        $(this).children("#color_5_hex").css("display", "flex");
        $(this).children("#copy_icon_id").css("display", "flex");
    })

    $(document).on("mouseleave", "#color_5", function(){
        $(this).children("#color_5_hex").css("display", "none");
        $(this).children("#copy_icon_id").css("display", "none");
    })

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

})