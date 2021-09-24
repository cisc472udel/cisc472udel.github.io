
import {rtdb, titleRef} from './index.js';

document.getElementById("signup-form").onsubmit = function(){
    let credentialRef = rtdb.child(titleRef, "credentials");
    let credentialObj = {
        "email" : document.getElementById("user-email").value,
        "username" : document.getElementById("user-username").value,
        "password" : document.getElementById("user-password").value
    }
    rtdb.push(credentialRef, credentialObj);
};
