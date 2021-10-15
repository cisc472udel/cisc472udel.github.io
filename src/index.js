import {auth, fbauth, serverRef, rtdb} from './firebase-connection.js';

let username;
let user;
let userUID;
let messageID = 0; // message id to keep track of incoming messages in the database
let signUpForm = false; // Flag to check whether or not we are in Sign Up page
let loginForm = true; // Flag to check whether or not we are in Login page
let passwordResetPage = false; // Flag to check whether or not we are in Password Reset page

let handleHash = function(){
    if(signUpForm == true){
        document.getElementById("login").style = "display: none";
        document.getElementById("signup").style = "display: block";
        document.getElementById("main_page").style = "display: none";
        document.getElementById("password-reset").style = "display: none";
    }
    if(loginForm == true){
        document.getElementById("signup").style = "display: none";
        document.getElementById("login").style = "display: block";
        document.getElementById("main_page").style = "display: none";
        document.getElementById("password-reset").style = "display: none";
    }
    if(passwordResetPage == true){
        let email = document.getElementById("signin-email").value;

        document.getElementById("signup").style = "display: none";
        document.getElementById("login").style = "display: none";
        document.getElementById("main_page").style = "display: none";
        document.getElementById("password-reset").style = "display: block";

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
        username = document.getElementById("user-username").value;
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
        user = auth.currentUser;       
        userUID = user.uid;
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
/*
// Action to be performed when user clicks on "Send" button within Main Page of Discord
document.getElementById("send-btn").onclick = function(){

    messageID = messageID + 1;
    let msgRef = rtdb.child(chatRef, String(messageID));

    let messageIDObj = {
        "id": messageID,
        "username": String(username),
        "message" : document.getElementById("message-field").value,
        "edited": false
    }

    rtdb.update(msgRef, messageIDObj);

    rtdb.onValue(msgRef, ss=>{
        alert(JSON.stringify(ss.val()));
    });

    let chats = document.getElementById("chats");
    let message = document.createElement("div");
    let editMessage = document.createElement("div");
    let lineBreak = document.createElement("br");
    
    message.className = "msg";
    message.innerHTML = messageIDObj.message;

    let textBox = document.createElement("input");
    textBox.type = "text";
    textBox.id = "edit-field-id-" + String(messageIDObj.id);
    textBox.placeholder = "Edit Your Message";

    let sendBtn = document.createElement("input");
    sendBtn.type = "button";
    sendBtn.id = "send-edit-btn-id-" + String(messageIDObj.id);
    sendBtn.value = "Send Your Edit";

    editMessage.appendChild(textBox);
    editMessage.appendChild(sendBtn);

    editMessage.style = "display: none";
    message.onclick = function(){

        editMessage.style = "display: block";
        document.getElementById(sendBtn.id).onclick = function(){
            let editedText = String(document.getElementById(textBox.id).value).trim();
            if(editedText.length > 0){
                messageIDObj.edited = true;
                message.innerHTML = editedText + " (Edited)";
                messageIDObj.message = editedText; 
                rtdb.update(msgRef, messageIDObj);
            }

            editMessage.style = "display: none";
        }   
    };
    chats.appendChild(message);
    chats.appendChild(editMessage);
    chats.appendChild(lineBreak);
}
*/

document.getElementById("addserver-btn").onclick = function(){
    document.getElementById("create-server").style.display = "block";
}

document.getElementById("cancel-btn").onclick = function(){
    document.getElementById("create-server").style.display = "none";
}

document.getElementById("create-server-btn").onclick = function(){
    let serverList = document.getElementById("serverlist");
    let server = document.createElement("div");
    let serverName = String(document.getElementById("server-name").value);

    server.innerHTML = "<a href='' style='text-decoration: none; color: white'>" + serverName + "</a>";
    serverList.appendChild(server);

    document.getElementById("create-server").style.display = "none";
    document.getElementById("server-name").value = "";

    let nameRef = rtdb.child(serverRef, serverName);
    let userObj = {
        "admin": true,
        "userID": userUID,
        "username": String(username)
    }

    let serverObj = {
        "chats": [],
        "members": [
            userObj
        ],
        "createdBy" : userObj,
        "serverID" : userObj.userID
    };

    rtdb.update(nameRef, serverObj);

    rtdb.onValue(serverRef, ss=>{
        alert(JSON.stringify(ss.val()));
    });

}