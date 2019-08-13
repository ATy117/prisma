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
        console.log("triggered");
        let query = $(".search_text_input").val();

        if (query){
            console.log("may query");
            window.location.href = `/search/${query}`;
        }
    });
})