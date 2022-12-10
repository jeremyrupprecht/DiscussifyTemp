let socket = io()


let currentCommunity;
let address = window.location.href;
let userName = address.substring(address.lastIndexOf("/") + 1);
console.log(userName);
if (true) {
  currentCommunity = {
    id: userName,
  };
}
console.log("The community I'm in is " + currentCommunity.id);

document.getElementById('communityTitle').innerHTML = currentCommunity.id;


socket.on("updatePosts", ({title, content, community}) => {
  
  const newDiv = document.createElement("div");
  
  const h1 = document.createElement("H1");
  const hText = document.createTextNode(title);
  
  const p = document.createElement("p");
  const pText = document.createTextNode(content);
  
  h1.appendChild(hText);
  p.appendChild(pText);
  
  newDiv.appendChild(h1);
  newDiv.appendChild(p);
  
  document.body.appendChild(newDiv);

  document.getElementById('modal-container-HTP').classList.remove('show');
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
  socket.emit("posted", ({title: title, content: content, community: currentCommunity.id}));
}