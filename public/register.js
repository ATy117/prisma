window.onload = function(){
    let userExists = false;
    $(".input_username_register").focusout(function(){
        let usernameTest = $(".input_username_register").val();
        
        if (usernameTest ==""){
            $(".register_username_message").remove();
            userExists = true;
            return;
        }

        let data = {};
        data.usernameTest = usernameTest;
        $.post("/register/username_test", data, function(data, status){
            console.log(data);
            //Hide existing messages dito kung meron
            $(".register_username_message").remove();
            if (data =="Available"){
                userExists = false;
                // Create the error message div here
                $(".input_username_register").after('<span class="register_username_message green_text">Username is available.</span>');
            } else if (data == "Exists"){
                userExists = true;
                //Create the error message div here
                $(".input_username_register").after('<span class="register_username_message">Username is taken.</span>');
            }
        });
    });

    $(".register_submit").click(async function(e){
        $(".pass_error").remove();
        var hasError = false;
        var passwordVal = $(".input_password_register").val();
        var checkVal = $(".input_pass_confirm").val();
        if (passwordVal != checkVal ) {
            $(".input_pass_confirm").after('<span class="pass_error">Passwords do not match.</span>');
            hasError = true;
        }

        await $(".input_username_register").trigger("focusout");
        if(hasError || userExists) {
            e.preventDefault();
        }
    });
};