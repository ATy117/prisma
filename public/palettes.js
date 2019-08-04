

$(document).ready(function(){
    
    var modal = document.getElementById("myModal");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("delete_confirmation_button")[0];

    $(document).on("click", "#delete_button_id", function(){
        modal.style.display = "block";
    })

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
    modal.style.display = "none";
    }

    $("#confirm_button").click(function(){
        modal.style.display = "none";
    })

    $("#cancel_button").click(function(){
        modal.style.display = "none";
    })

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
    }

})