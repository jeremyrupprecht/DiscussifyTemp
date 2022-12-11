let socket = io()

let alertMess = document.getElementById("alertMessage")
let sAlertMess = document.getElementById("signUpAlertMessage")

let myID

socket.on("usrNotFound", (id) => {
  if(id === myID)
    {
     alertMess.innerHTML = "User Not Found!";
      alertMess.style.color = "red"; 
    }
})

socket.on("succesfulLogin", (id) => {
  if(id == myID)
    {
      window.location.href = "mainPage.html";
    }
})

socket.on("NotAllowed", (id) => {
  if(id === myID)
    {
     alertMess.innerHTML = "Not Allowed!";
      alertMess.style.color = "red"; 
    }
})

socket.on("reconfirmYourPass", (id) => {
  console.log("The id is " + id);
  console.log("The myID is " + myID);
  if(id === myID)
    {
     sAlertMess.innerHTML = "Reconfirm Password!";
     sAlertMess.style.color = "red"; 
    }
})

socket.on("successfulSignUp", (id) => {
  if(id === myID)
    {
     sAlertMess.innerHTML = "Acount Created!";
     sAlertMess.style.color = "green"; 
    }
})

socket.on("pleaseGetTheUsername", () => {
  socket.emit("theUsernameIs", ({myID}));
})

function signupFunc()
{
    console.log(document.getElementById("suname").value);
    console.log(document.getElementById("spsw").value);
    console.log(document.getElementById("scpsw").value);

    if(document.getElementById("spsw").value === document.getElementById("scpsw").value)
    {
        socket.emit('signup', {username: document.getElementById("suname").value, password: document.getElementById("spsw").value})
        myID = document.getElementById("suname").value;
    }
    else
    {
        console.log("Reconfirm password")
        socket.emit('reconfirmPass', {username: document.getElementById("suname").value})
        myID = document.getElementById("suname").value;
    }
}

function loginFunc()
{
    socket.emit('login', {username: document.getElementById("uname").value, password: document.getElementById("psw").value})
    myID = document.getElementById("uname").value; 
}