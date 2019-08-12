

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

})