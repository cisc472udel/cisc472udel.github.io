import {rtdb, credentialKeys, credentialRef} from './index.js';

/* Reads the data from database and store it in an array to check for duplicate email */
rtdb.get(credentialRef).then(ss=>{
    ss.forEach(element => {
        let storedemail = String(element.val()["email"]);
        let storedpassword = String(element.val()["password"]);
        let newObj = {
            email : storedemail,
            password: storedpassword
        };
        credentialKeys.push(newObj);
    });
});

document.getElementById("signin-form").onsubmit = function(){
    let useremail = String(document.getElementById("signin-email").value);
    let userpassword = String(document.getElementById("signin-password").value);

    for(let i = 0; i < credentialKeys.length; i++){
        if(credentialKeys[i].email == useremail && credentialKeys[i].password == userpassword){
            document.getElementById("signin-form").setAttribute("action", "/html/mainpage.html");
            document.getElementById("signin-form").setAttribute("target", "_self");
            document.getElementById("credentialChecker").innerText = ""
            return true;
        }
    }

    document.getElementById("credentialChecker").innerText = "Invalid Email/Password"
    document.getElementById("credentialChecker").style = "color: red";
    return false;
    
};
