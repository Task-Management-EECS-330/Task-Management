(function () {
    'use strict'
  
    window.addEventListener('load', function () {
      // Fetch all the forms we want to apply custom Bootstrap validation styles to
      var title = GetQueryString("title");
      var location = GetQueryString("location");
      var from = GetQueryString("from");
      var to = GetQueryString("to");
      var type = GetQueryString("type");
      var id = GetQueryString("id");
      var start_date = GetQueryString("start_date");
      var repeat = GetQueryString("repeat");
      var alert = GetQueryString("alert");

      var start_time = from.split(' ');
      var start_ampm = start_time[1];
      var start_hhmm = start_time[0].split(':');
      var start_hour = start_hhmm[0];
      var start_min = start_hhmm[1];

      var end_time = to.split(' ');
      var end_ampm = end_time[1];
      var end_hhmm = end_time[0].split(':');
      var end_hour = end_hhmm[0];
      var end_min = end_hhmm[1];
      
  
      $("#taskName").val(title);
      $("#location").val(location);
      $("#type").val(type);
      $("#start_hour").val(start_hour);
      $("#start_min").val(start_min);
      $("#start_ampm").val(start_ampm);
      $("#end_hour").val(end_hour);
      $("#end_ampm").val(end_ampm);
      $("#end_min").val(end_min);
      $("#startDate").val(start_date);
      $("#alert").val(alert);
      $("#repeat").val(repeat);

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
          event.alert = $("#alert").val();
          event.repeat = $("#repeat").val();

          var Class = GetQueryString("class");
          var defaultTime = GetQueryString("defaultTime");
          var user  = GetQueryString("user");
          var tel = GetQueryString("tel");
          var email = GetQueryString("email");

          window.location.href="weekView.html?class="+ Class + "&&defaultTime="+ defaultTime + "&&user=" + user + "&&tel=" + tel + "&&email=" + email + 
            "&&title="+event.title+"&&location="+event.location+"&&start_date="+event.start_date+"&&start_hour="+event.start_hour+"&&start_ampm="+event.start_ampm+"&&start_min="+event.start_min+
            "&&end_hour="+event.end_hour+"&&end_ampm="+event.end_ampm+"&&end_min="+event.end_min+"&&type="+event.type+"&&repeat="+event.repeat+ "&&alert="+event.alert+"&&id="+id+"&&method=edit";
          form.classList.add('was-validated');
        }, false)
      })
    }, false)
}())

function GetQueryString(name)
{
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
}

function back(){
  var href = window.location.href.split("?")[1];
  window.location.href="weekView.html?" + href;
}

function deleteTask(){
  var href = window.location.href.split("?")[1];
  window.location.href="weekView.html?" + href + "&&method=delete";
}