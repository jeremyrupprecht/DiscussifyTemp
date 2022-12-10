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


const modal_container_HTP = document.getElementById('modal-container-HTP');

document.getElementById('communityTitle').innerHTML = currentCommunity.id;

function enablePost()
{
  modal_container_HTP.classList.add('show');
}

function closePosting()
{
  modal_container_HTP.classList.remove('show');
}

function postContent(title, content)
{
  console.log(title);
  
  const h1 = document.createElement("H1");
  const hText = document.createTextNode(title);
  
  const p = document.createElement("p");
  const pText = document.createTextNode(content);
  
  h1.appendChild(hText);
  p.appendChild(pText);
  
  document.body.appendChild(h1);
  document.body.appendChild(p);
  
  modal_container_HTP.classList.remove('show');
}