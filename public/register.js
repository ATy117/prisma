window.onload = function(){
    let userExists = false;
    $(".input_username").focusout(function(){
        let usernameTest = $(".input_username").val();
        
        if (usernameTest ==""){
            $(".register_username_message").remove();
            userExists = true;
            return;
        }

        let data = {};
        data.usernameTest = usernameTest;
        $.post("/register_username_test", data, function(data, status){
            console.log(data);
            //Hide existing messages dito kung meron
            $(".register_username_message").remove();
            if (data =="Available"){
                userExists = false;
                // Create the error message div here
                $(".input_username").after('<span class="register_username_message">Username is goods for use.</span>');
            } else if (data == "Exists"){
                userExists = true;
                //Create the error message div here
                $(".input_username").after('<span class="register_username_message">Username is taken.</span>');
            }
        });
    });

    $(".register_submit").click(async function(e){
        $(".pass_error").remove();
        var hasError = false;
        var passwordVal = $(".input_password").val();
        var checkVal = $(".input_pass_confirm").val();
        if (passwordVal != checkVal ) {
            $(".input_pass_confirm").after('<span class="pass_error">Passwords do not match.</span>');
            hasError = true;
        }

        await $(".input_username").trigger("focusout");
        if(hasError || userExists) {
            e.preventDefault();
        }
    });
};