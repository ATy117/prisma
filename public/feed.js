$(document).ready(function(){
    $(document).on("click", "#like_palette_id", async function(){
        if($(this).attr("data-liked") == "liked") {
            // unlike it here
            let id = $(this).attr("data-id");
            let like = this;

            await $.post(`/social/unlike_palette/${id}`, function(data, status){
                if (data == "Success"){
                    $(like).attr("src","/assets/heartGray.png");
                    $(like).attr("data-liked", "unliked");
                }
            });
        }
        else {
            // like it here
            let id = $(this).attr("data-id");
            let like = this;

            await $.post(`/social/like_palette/${id}`, function(data, status){
                if (data == "Success"){
                    $(like).attr("src","/assets/hearPink.png");
                    $(like).attr("data-liked", "liked");
                }
            });
        }
    });

    $(".nav_search_form").submit(function(e){
        e.preventDefault();
    })
    $(".search_submit_button").click(function(){
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
    
    $(".color_hex").click(function(){
        let thingy = this;
        let hex = $(this).attr("data-color");
        let original = $(this).text();
        console.log(hex);

        //Copies
        var $temp = $("<textarea>");
        $("body").append($temp);
        $temp.val(hex).select();
        document.execCommand("copy");
        $temp.remove();

        // Future stuff pag naayos na ung look nito
        // // Set Text to Copied!
        // $(this).text("Copied!");
        // $(this).css("display", "flex");

        // setTimeout(function(){ 
        //     $(thingy).html(hex+ "<br>Click to Copy!" );
        //     $(thingy).css("display", "none");
        // }, 1500);
        

    });

    $(document).on("mouseover", "#color_1", function(){
        $(this).children("#color_1_hex").css("display", "flex");
    })

    $(document).on("mouseleave", "#color_1", function(){
        $(this).children("#color_1_hex").css("display", "none");
    })

    
    $(document).on("mouseover", "#color_2", function(){
        $(this).children("#color_2_hex").css("display", "flex");
    })

    $(document).on("mouseleave", "#color_2", function(){
        $(this).children("#color_2_hex").css("display", "none");
    })

    
    $(document).on("mouseover", "#color_3", function(){
        $(this).children("#color_3_hex").css("display", "flex");
    })

    $(document).on("mouseleave", "#color_3", function(){
        $(this).children("#color_3_hex").css("display", "none");
    })

    
    $(document).on("mouseover", "#color_4", function(){
        $(this).children("#color_4_hex").css("display", "flex");
    })

    $(document).on("mouseleave", "#color_4", function(){
        $(this).children("#color_4_hex").css("display", "none");
    })

    
    $(document).on("mouseover", "#color_5", function(){
        $(this).children("#color_5_hex").css("display", "flex");
    })

    $(document).on("mouseleave", "#color_5", function(){
        $(this).children("#color_5_hex").css("display", "none");
    })
})