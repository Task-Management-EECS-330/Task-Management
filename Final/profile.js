// Example starter JavaScript for disabling form submissions if there are invalid fields
var Class = null;
var defaultTime = null;
(function () {
    'use strict'
        window.addEventListener('load', function () {
            
            var user = GetQueryString("user");
            var tel = GetQueryString("tel");
            var email = GetQueryString("email");
            Class = GetQueryString("class");
            defaultTime = GetQueryString("defaultTime");
            
            $("#userName").val(user);
            $("#phoneNumber").val(tel);
            $("#email").val(email);

            var type = document.getElementById("type");
            var startTime = document.getElementById("startTime");
            
            if(defaultTime!="null"){
                var start_time = defaultTime.split(":");
                var start_hour = start_time[0];
                var start_temp = start_time[1].split("");
                var start_min = start_temp[0]+start_temp[1];
                var start_ampm = start_temp[2]+start_temp[3];
                $("#type").val(Class);
                startTime.style.display="block";
                $("#start_hour").val(start_hour);
                $("#start_min").val(start_min);
                $("#start_ampm").val(start_ampm);
            }
            

            type.addEventListener("change", function(event){
                if(type.value != '0'){
                    startTime.style.display="block";
                }
                else{
                    startTime.style.display="none";
                }
            })
            
            
        }, false)
    }())
    
    function back(){
        var href = window.location.href.split("?");
        if (href.length == 2){
            href = "weekview.html?" + href[1];
        }
        else{
            href = "weekview.html";
        }
        window.location.href = href;
    }

    function GetQueryString(name)
    {
       var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
       var r = window.location.search.substr(1).match(reg);
       if(r!=null)return  unescape(r[2]); return null;
    }

    function save(){
        var user = GetQueryString("user");
        var tel = GetQueryString("tel");
        var email = GetQueryString("email");
        var type = $("#type").val();
        var startTime = $("#start_hour").val()+":"+$("#start_min").val()+$("#start_ampm").val();
        var url = window.location.href.split("?");
        var temp2 = url[1].split("&&")
        if (temp2.length == 5){
            if (type != "0"){
                url = "weekview.html?" + "class=" + type + "&&defaultTime=" + startTime + "&&user=" + user + "&&tel=" + tel + "&&email=" + email;
            }
            else{
                url = "weekview.html?class=0&&defaultTime=null&&user=" + user + "&&tel=" + tel + "&&email=" + email;
            }
        }
        else {
            url = "weekview.html?" + "class=" + type + "&&defaultTime=" + startTime
            for (i = 2; i<temp2.length; i++){
                url += "&&"+temp2[i];
            }
        }
        window.location.href = url;
    }