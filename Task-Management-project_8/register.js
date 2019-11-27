// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
'use strict'

    window.addEventListener('load', function () {
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.getElementsByClassName('needs-validation')
        $(".required").after('<span style="color:red">*</span>');

        // Loop over them and prevent submission
        Array.prototype.filter.call(forms, function (form) {
        form.addEventListener('submit', function (event) {
            if (form.checkValidity() === false) {
                event.preventDefault();
                event.stopPropagation();
                form.classList.add('was-validated');
                return;
            }

            var event = new Object();
            event.username = $("#userName").val();
            event.password = $("#password").val();
            event.rePassword = $("#rePassword").val();
            event.phoneNumber = $("#phoneNumber").val();
            event.email = $("#email").val();

            if (event.password != event.rePassword){
                debugger;
                alert("Two passwords are differenet");
                $("#password").val("");
                $("#rePassword").val("");
                return;
            }

            var matchStr = /^\d{10}$/;
            if(!matchStr.test(event.phoneNumber)){
                debugger;
                alert("please input right phone number !");
                $('#phoneNumber').focus();
                return false;
            }

            var search_str = /^[\w\-\.]+@[\w\-\.]+(\.\w+)+$/;
            if(!search_str.test(event.email)){       
                alert("please input right email !");
                $('#email').focus();
                return false;
            }
            window.location.href="index.html?username="+event.username+"&&password="+event.password+"&&phone="+event.phoneNumber+"&&email="+event.email;
        }, false)
        })
    }, false)
}())

function back(){
    window.location.href="index.html";
}