
import {auth, fbauth } from './firebase-connection.js';

window.onload = function(){
    window.addEventListener("o")
}
let signUpForm = true;
let handleHash = function(){
    if(signUpForm == true){
        signUpForm = false;
        document.getElementById("login").style = "display: block; text-align: center";
        document.getElementById("signup").style = "display: none";
    }
    else{
        signUpForm = true;
        document.getElementById("signup").style = "display: block; text-align: center";
        document.getElementById("login").style = "display: none";
    }
    document.getElementById("main_page").style = "display: none";
};

document.getElementById("login-link").onclick = function(){
    document.getElementById("signupChecker").innerText = "";
    document.getElementById("user-email").value = "";
    document.getElementById("user-username").value = "";
    document.getElementById("user-password").value = "";
    window.addEventListener("hashchange", handleHash);
    window.addEventListener("load", handleHash);
};

document.getElementById("signup-link").onclick = function(){
    document.getElementById("signin-email").value = "";
    document.getElementById("signin-password").value = "";
    window.addEventListener("hashchange", handleHash);
    window.addEventListener("load", handleHash);
};
/* Action to be performed when user clicks "Sign Up" button */
document.getElementById("signup-btn").onclick = function(e){
    let email = document.getElementById("user-email").value;
    let password = document.getElementById("user-password").value;

    fbauth.createUserWithEmailAndPassword(auth, email, password).then(()=>{
        document.getElementById("signupChecker").innerText = "SIGNUP SUCCESSFUL!!!";
    }).catch(e=>{
        document.getElementById("signupChecker").innerText = "";
        alert(e.code);
    });
};

/* Action to be performed when user clicks "Login" button */
document.getElementById("login-btn").onclick = function(){
    let email = document.getElementById("signin-email").value;
    let password = document.getElementById("signin-password").value;

    fbauth.signInWithEmailAndPassword(auth, email, password).then(()=>{
        location.href = "#main_page";
        window.addEventListener("hashchange", mainPageHash);
        window.addEventListener("load", mainPageHash);
    }).catch(e=>{
        alert(e.code);
    })
    
};

let mainPageHash = function() {
    document.getElementById("signup").style = "display: none";
    document.getElementById("login").style = "display: none";
    document.getElementById("main_page").style = "display: block";
}