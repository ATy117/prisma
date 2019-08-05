$(document).ready(function(){
    // Get the modal
    var modal = document.getElementById("myModal_followers");
    var modal2 = document.getElementById("myModal_following");

    // When the user clicks on the button, open the modal 
    $("#followers_container").click(function(){
        modal.style.display = "block";
    })

    // When the user clicks on <span> (x), close the modal
    $("#close").click(function(){    
        modal.style.display = "none";
    })
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
    }

     // When the user clicks on the button, open the modal 
     $("#following_container").click(function(){
        modal2.style.display = "block";
    })

    // When the user clicks on <span> (x), close the modal
    $("#close_following").click(function(){    
        modal2.style.display = "none";
    })
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
    if (event.target == modal2) {
        modal2.style.display = "none";
    }
    }
})