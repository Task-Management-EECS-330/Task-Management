function login() {

    var username = document.getElementById("inputUsername");
    var pass = document.getElementById("inputPassword");
  
    var newuser = GetQueryString("username");
    var newpassword = GetQueryString("password");

    if (username.value == "") {
    
        alert("Please enter username");
    
    } else if (pass.value  == "") {
        
        alert("Please enter password");
    
    } else if(username.value == "admin" && pass.value == "123456"){
        
        window.location.href="weekView.html?class=0&&defaultTime=null&&user=admin&&tel=773-123-4567&&email=admin@u.northwestern.edu";
   
    }else if(username.value == newuser && pass.value == newpassword){

        window.location.href="weekView.html?user="+newuser;

    } else {
   
        alert("Please enter correct username and password")
    
    }
}

function GetQueryString(name)
{
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
}