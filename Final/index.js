function login() {

    var username = document.getElementById("inputUsername");
    var pass = document.getElementById("inputPassword");
  
    var newuser = GetQueryString("username");
    var newpassword = GetQueryString("password");
    var tel = GetQueryString("phone");
    var email = GetQueryString("email");

    if (username.value == "") {
    
        alert("Please enter username");
    
    } else if (pass.value  == "") {
        
        alert("Please enter password");
    
    } else if(username.value == "admin" && pass.value == "123456"){
        
        window.location.href="weekView.html?class=0&&defaultTime=null&&user=admin&&tel=7731234567&&email=admin@u.northwestern.edu";
   
    }else if(username.value == newuser && pass.value == newpassword){

        window.location.href="weekView.html?class=0&&defaultTime=null&&user=" + newuser + "&&tel=" + tel + "&&email=" + email;

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