
import {rtdb, credentialKeys, credentialRef} from './index.js';


/* Reads the data from database and store it in an array to check for duplicate email */
rtdb.get(credentialRef).then(ss=>{
    ss.forEach(element => {
        let key = String(element.val()["email"]);
        credentialKeys.push(key);
    });
    // alert(credentialKeys);
});

/* Action to be performed when user clicks "Sign Up" button */
document.getElementById("signup-form").onsubmit = function(){   

    let credentialObj = {
        "email" : document.getElementById("user-email").value,
        "username" : document.getElementById("user-username").value,
        "password" : document.getElementById("user-password").value
    }
    let key = String(document.getElementById("user-email").value);

    if(credentialKeys.length > 1){
        if(credentialKeys.includes(key)){
            document.getElementById("emailChecker").innerText = "Email is already in use"
            document.getElementById("emailChecker").style = "color: red";
            return false;
        }
        else{
            if(!key.endsWith(".org") && !key.endsWith(".com") && !key.endsWith(".edu") && !key.endsWith(".in") && !key.endsWith(".co.in") ){
                document.getElementById("emailChecker").innerText = "Invalid email extension(use .org, .edu, .in, .co.in or .com)";
                document.getElementById("emailChecker").style = "color: red"; 
                return false;
            }
            document.getElementById("emailChecker").innerText = "";
            credentialKeys.push(key);
            rtdb.push(credentialRef, credentialObj);
            document.getElementById("signup-form").setAttribute("action", "html/successful-signup.html");
            document.getElementById("signup-form").setAttribute("target", "_blank");
        }
    }
    else{
        if(!key.endsWith(".org") && !key.endsWith(".com") && !key.endsWith(".edu") && !key.endsWith(".in") && !key.endsWith(".co.in") ){
            document.getElementById("emailChecker").innerText = "Invalid email extension(use .org, .edu, .in, .co.in or .com)";
            document.getElementById("emailChecker").style = "color: red"; 
            return false;
        }
        document.getElementById("emailChecker").innerText = "";
        credentialKeys.push(key);
        rtdb.push(credentialRef, credentialObj);
        document.getElementById("signup-form").setAttribute("action", "html/successful-signup.html");
        document.getElementById("signup-form").setAttribute("target", "_blank");
    }
};