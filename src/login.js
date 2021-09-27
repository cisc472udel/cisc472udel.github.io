import {auth, fbauth } from './index.js';

document.getElementById("login-btn").onclick = function(){
    let email = document.getElementById("signin-email").value;
    let password = document.getElementById("signin-password").value;

    fbauth.signInWithEmailAndPassword(auth, email, password).then(()=>{
        window.location.href = "/html/mainpage.html";
    }).catch(e=>{
        alert(e.code);
    })
    
};  