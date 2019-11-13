// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
  'use strict'

  window.addEventListener('load', function () {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.getElementsByClassName('needs-validation')

    // Loop over them and prevent submission
    Array.prototype.filter.call(forms, function (form) {
      form.addEventListener('submit', function (event) {
        if (form.checkValidity() === false) {
          event.preventDefault()
          event.stopPropagation()
        }
        form.classList.add('was-validated')
      }, false)
    })
      var option = document.getElementById("repeat")
      var endRepeat = document.getElementById("endRepeat");

      option.addEventListener("change", function(event){
      
        if(option.value == 'none'){
          endRepeat.style.display="none";
        }
        else{
          endRepeat.style.display="";
        }
    })

  }, false)
}())

function back(){
  window.location.href="calendar.html";
}

