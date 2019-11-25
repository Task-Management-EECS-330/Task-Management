// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
  'use strict'

  window.addEventListener('load', function () {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.getElementsByClassName('needs-validation')
    $(".required").after('<span style="color:red">*</span>');
    
    $('#startDay').datepicker({
      format:"yyyy/mm/dd",
    });
    $('#endDate').datepicker();

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
        event.title = $("#taskName").val();
        event.location = $("#location").val();
        event.start_date = $("#startDate").val();
        event.start_hour = $("#start_hour").val();
        event.start_ampm = $("#start_ampm").val();
        event.start_min = $("#start_min").val();
        event.end_hour = $("#end_hour").val();
        event.end_ampm = $("#end_ampm").val();
        event.end_min = $("#end_min").val();
        event.type = $("#type").val();
        debugger;
        window.location.href="weekView.html?title="+event.title+"&&location="+event.location+"&&start_date="+event.start_date+"&&start_hour="+event.start_hour+"&&start_ampm="+event.start_ampm+"&&start_min="+event.start_min+
          "&&end_hour="+event.end_hour+"&&end_ampm="+event.end_ampm+"&&end_min="+event.end_min+"&&type="+event.type+"&&method=add";
        form.classList.add('was-validated');
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
  window.location.href="weekView.html";
}

