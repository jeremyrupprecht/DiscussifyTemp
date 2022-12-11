let socket = io()


let myID

let currentCommunity;
let address = window.location.href;
var parts = address.split("?");
let temp = parts[0].split("/");
let communName = temp[3];
var userID = parts[1];
console.log(communName);
if (true) {
  currentCommunity = {
    id: communName,
  };
}


socket.on("showThePost", ({title, content, community, username}) => {
    
      console.log("the Title is " + title);
      console.log("the content is " + content);
      console.log("the community is " + community);
      console.log("the username is " + username);
  
      const p2 = document.createElement("p");
      const p2Text = document.createTextNode(username);
      
      const newDiv = document.createElement("div");
  
      const h1 = document.createElement("H1");
      const hText = document.createTextNode(title);

      const p = document.createElement("p");
      const pText = document.createTextNode(content);
      
      var a = document.createElement('a');
      a.setAttribute('href', 'postPage.html');
      a.innerText = "Reply";
      
      h1.appendChild(hText);
      p.appendChild(pText);
      p2.appendChild(p2Text);

      newDiv.appendChild(p2);
      newDiv.appendChild(h1);
      newDiv.appendChild(p);
      newDiv.appendChild(a);
      
      newDiv.style.border = "3px solid #000000";
      newDiv.style.marginTop = "10px";
      newDiv.style.marginLeft = "180px";
      newDiv.style.width = "80%";

      document.body.appendChild(newDiv);

      document.getElementById('modal-container-HTP').classList.remove('show'); 
    
})