function login() {

    var username = document.getElementById("inputUsername");
    var pass = document.getElementById("inputPassword");
  
    if (username.value == "") {
    
        alert("Please enter username");
    
    } else if (pass.value  == "") {
        
        alert("Please enter password");
    
    } else if(username.value == "admin" && pass.value == "123456"){
        
        window.location.href="homepage.html";
   
    } else {
   
        alert("Please enter correct username and password")
    
    }
}