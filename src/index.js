import {auth, fbauth, chatRef, rtdb} from './firebase-connection.js';

let signUpForm = true; // Flag to check whether or not we are in Sign Up page
let loginForm = false;
let passwordResetPage = false;
let handleHash = function(){
    if(signUpForm == true){
        document.getElementById("login").style = "display: none";
        document.getElementById("signup").style = "display: block; text-align: center";
        document.getElementById("main_page").style = "display: none";
        document.getElementById("password-reset").style = "display: none";
    }
    if(loginForm == true){
        document.getElementById("signup").style = "display: none";
        document.getElementById("login").style = "display: block; text-align: center";
        document.getElementById("main_page").style = "display: none";
        document.getElementById("password-reset").style = "display: none";
    }
    if(passwordResetPage == true){
        let email = document.getElementById("signin-email").value;

        document.getElementById("signup").style = "display: none";
        document.getElementById("login").style = "display: none";
        document.getElementById("main_page").style = "display: none";
        document.getElementById("password-reset").style = "display: block; text-align: center";

        fbauth.sendPasswordResetEmail(auth, email).then(() => {
            // Password reset email sent!
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorCode);
        });
    }
};

document.getElementById("login-link").onclick = function(){
    loginForm = true;
    signUpForm = false;
    passwordResetPage = false;
    document.getElementById("signupChecker").innerText = "";
    document.getElementById("user-email").value = "";
    document.getElementById("user-username").value = "";
    document.getElementById("user-password").value = "";
    window.addEventListener("hashchange", handleHash);
    window.addEventListener("load", handleHash);
};

document.getElementById("password-reset-login-link").onclick = function() {
    loginForm = true;
    signUpForm = false;
    passwordResetPage = false;
    window.addEventListener("hashchange", handleHash);
    window.addEventListener("load", handleHash);
    document.getElementById("signin-email").value = "";
    document.getElementById("signin-password").value = "";
};

document.getElementById("signup-link").onclick = function(){
    loginForm = false;
    signUpForm = true;
    passwordResetPage = false;
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

document.getElementById("password-reset-link").onclick = function(){
    passwordResetPage = true;
    signUpForm = false;
    loginForm = false;
    window.addEventListener("hashchange", handleHash);
    window.addEventListener("load", handleHash);
};

let mainPageHash = function() {
    document.getElementById("signup").style = "display: none";
    document.getElementById("login").style = "display: none";
    document.getElementById("password-reset").style = "display: none";
    document.getElementById("main_page").style = "display: block";
}

document.getElementById("send-btn").onclick = function(){
    let messageObj = {
        "message" : document.getElementById("message-field").value
    };
    let messageKey = rtdb.push(chatRef, messageObj).key;

    rtdb.onValue(chatRef, ss=>{
        alert(JSON.stringify(ss.val()[messageKey].message));
    });

    let list = document.getElementById("bulleted-message");
    let listItem = document.createElement("li");
    listItem.textContent = document.getElementById("message-field").value;
    list.appendChild(listItem);
}