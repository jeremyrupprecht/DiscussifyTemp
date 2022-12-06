let socket = io()

let alertMess = document.getElementById("alertMessage")
let sAlertMess = document.getElementById("signUpAlertMessage")

socket.on("usrNotFound", () => {
    alertMess.innerHTML = "User Not Found!";
    alertMess.style.color = "red";
})

socket.on("succesfulLogin", () => {
    alertMess.innerHTML = "Success!";
    alertMess.style.color = "green";
})

socket.on("NotAllowed", () => {
    alertMess.innerHTML = "Not Allowed!";
    alertMess.style.color = "red";
})

socket.on("reconfirmYourPass", () => {
    sAlertMess.innerHTML = "Reconfirm Password!";
    sAlertMess.style.color = "red";
})

socket.on("successfulSignUp", () => {
    sAlertMess.innerHTML = "Acount Created!";
    sAlertMess.style.color = "green";
})

function signupFunc()
{
    console.log(document.getElementById("suname").value);
    console.log(document.getElementById("spsw").value);
    console.log(document.getElementById("scpsw").value);

    if(document.getElementById("spsw").value === document.getElementById("scpsw").value)
    {
        socket.emit('signup', {username: document.getElementById("suname").value, password: document.getElementById("spsw").value})
    }
    else
    {
        console.log("Reconfirm password")
        socket.emit('reconfirmPass')
    }
}

function loginFunc()
{
    socket.emit('login', {username: document.getElementById("uname").value, password: document.getElementById("psw").value})
}