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
console.log("The community I'm in is " + currentCommunity.id);

document.getElementById('communityTitle').innerHTML = currentCommunity.id;


socket.on("updatePosts", ({title, content, community, username}) => {
  if(community === currentCommunity.id)
    {
      const p2 = document.createElement("p");
      const p2Text = document.createTextNode("posted by " + username);
      
      const newDiv = document.createElement("div");
  
      const h1 = document.createElement("H1");
      const hText = document.createTextNode(title);

      const p = document.createElement("p");
      const pText = document.createTextNode(content);
      
      
      h1.appendChild(hText);
      p.appendChild(pText);
      p2.appendChild(p2Text);
      
      p2.style.color = "grey";

      newDiv.appendChild(p2);
      newDiv.appendChild(h1);
      newDiv.appendChild(p);
      
      newDiv.style.border = "3px solid #000000";
      newDiv.style.marginTop = "10px";
      newDiv.style.marginLeft = "180px";
      newDiv.style.width = "80%";

      document.body.appendChild(newDiv);

      document.getElementById('modal-container-HTP').classList.remove('show'); 
    }
})

function enablePost()
{
  document.getElementById('modal-container-HTP').classList.add('show');
}

function closePosting()
{
  document.getElementById('modal-container-HTP').classList.remove('show');
}

function postContent(title, content)
{
  socket.emit("posted", ({title: title, content: content, community: currentCommunity.id, username: userID}));
}