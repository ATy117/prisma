
/*window.onload = function(){

    console.log("palette.js");

    $("#delete_button_id").click(async function(e){
        console.log("Pressed Delete");
        $("#delete_button_id").remove();
        $(".edit_button").remove();

        var confirm_button = document.createElement('div');
        var cancel_button = document.createElement('div');
        confirm_button.appendChild(document.createTextNode("Confirm"));
        cancel_button.appendChild(document.createTextNode("Cancel"));
        confirm_button.classList.add("delete_confirmation_button");
        cancel_button.classList.add("delete_confirmation_button");

        document.getElementById('icons_container').append(confirm_button);
        document.getElementById('icons_container').append(cancel_button);
    })
}*/

$(document).on("click", "#delete_button_id", function(){
    $(this).remove();
    $("#edit_button_id").remove();

})