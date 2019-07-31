window.onload = function(){

    let accountExists = false;
    $(".login_form").submit(async function(event){
        
        event.preventDefault();
        let usernameTest = $(".input_username").val();
        let passwordTest = $(".input_password").val();

        let data = {};
        data.usernameTest = usernameTest;
        data.passwordTest = passwordTest;
        await $.post("/login_username_test", data, function(data, status){
            console.log(data);
            //Hide existing messages dito kung meron
            $(".login_message").remove();
            if (data =="NotExists"){
                accountExists = false;
                // Create the error message div here
                $(".login_submit").after('<h2 class="login_message">Account Does Not Exist</h2>');
            } else {
                accountExists = true;
            }
        });

        if (!accountExists){
        } else {
            $(this).unbind('submit').submit()
        }

    });
};