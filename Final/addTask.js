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

    var Class = GetQueryString("class");
    var defaultTime = GetQueryString("defaultTime");
    var user  = GetQueryString("user");
    var tel = GetQueryString("tel");
    var email = GetQueryString("email");

    var current_type = document.getElementById("type");
    if(current_type.value == Class){
      var start_time = defaultTime.split(":");
      var start_hour = start_time[0];
      var start_temp = start_time[1].split("");
      var start_min = start_temp[0]+start_temp[1];
      var start_ampm = start_temp[2]+start_temp[3];
      $("#start_hour").val(start_hour);
      $("#start_min").val(start_min);
      $("#start_ampm").val(start_ampm);
    }

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
        event.repeat = $("#repeat").val();
        event.alert = $("#alert").val();
        event.type = $("#type").val();
        
        window.location.href="weekView.html?class="+ Class + "&&defaultTime="+ defaultTime + "&&user=" + user + "&&tel=" + tel + "&&email=" + email + 
          "&&title="+event.title+"&&location="+event.location+"&&start_date="+event.start_date+"&&start_hour="+event.start_hour+"&&start_ampm="+event.start_ampm+"&&start_min="+event.start_min+
          "&&end_hour="+event.end_hour+"&&end_ampm="+event.end_ampm+"&&end_min="+event.end_min+"&&type="+event.type+"&&repeat="+event.repeat+"&&alert="+event.alert+"&&method=add";
        form.classList.add('was-validated');
      }, false)
    })
      
      current_type.addEventListener("change", function(event){
      if(current_type.value == Class){
          var start_time = defaultTime.split(":");
          var start_hour = start_time[0];
          var start_temp = start_time[1].split("");
          var start_min = start_temp[0]+start_temp[1];
          var start_ampm = start_temp[2]+start_temp[3];
          $("#start_hour").val(start_hour);
          $("#start_min").val(start_min);
          $("#start_ampm").val(start_ampm);
        }
      })


  }, false)
}())

function back(){
  var href = window.location.href.split("?")[1];
  window.location.href="weekView.html?" + href;
}

function GetQueryString(name)
{
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
}
