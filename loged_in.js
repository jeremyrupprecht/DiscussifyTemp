const { response } = require("express")

let socket = io()

// Client Side JS

let myID

//

function signupFunc() {

  let inputUsername = document.getElementById("suname").value
  let inputPassword = document.getElementById("spsw").value
  let inputConfirmPassword = document.getElementById("scpsw").value

  if (inputPassword === inputConfirmPassword) {

    fetch('http://localhost:3000/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: inputUsername,
        password: inputPassword
      })
    })
    .then(res => {
      if (res.ok) {
        console.log("OK! " + res.status)  
        showSuccessfulSignup()
      } else if (res.status === 409) {
        console.log("Username Taken! " + res.status)
        showUsernameTaken()
      }
    })        
    .catch(error => console.log('ERROR WITH SIGNUP FETCH'))

  } else {
    showReconfirmPassword()
  }
}

//

function showSuccessfulSignup() {
  let sAlertMess = document.getElementById("signUpAlertMessage")
  sAlertMess.innerHTML = "Acount Created!"
  sAlertMess.style.color = "green"
}

function showReconfirmPassword() {

  let sAlertMess = document.getElementById("signUpAlertMessage")
  sAlertMess.innerHTML = "Reconfirm Password!";
  sAlertMess.style.color = "red"; 
}

function showUsernameTaken() {
  let sAlertMess = document.getElementById("signUpAlertMessage")
  sAlertMess.innerHTML = "Username Already Taken!";
  sAlertMess.style.color = "red"; 
}

function showLoginFailure() {
  let alertMess = document.getElementById("alertMessage")
  alertMess.innerHTML = "Login Failure!";
  alertMess.style.color = "red"; 
}

function loginFunc() {
  
  let inputUsername = document.getElementById("uname").value 
  let inputPassword = document.getElementById("psw").value

  fetch('http://localhost:3000/login', {
      method: 'POST',
      credentials: "include",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: inputUsername,
        password: inputPassword
      }),
    })
    .then(res => {
      if (res.ok) {
          window.location.replace("mainPage.html");
          console.log("LOGIN OK!")
      } else if (res.status === 401) {
        console.log("Login Failure! " + res.status)
        showLoginFailure()

      } 
    })
    .catch(error => console.log('ERROR WITH LOGIN FETCH'))

}