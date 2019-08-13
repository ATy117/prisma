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
})