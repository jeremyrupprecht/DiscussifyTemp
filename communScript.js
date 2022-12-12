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
      
      // save the username, title and content information in the database
      
      const newDiv = document.createElement("div");
      
      const p2 = document.createElement("p");
      const p2Text = document.createTextNode("posted by " + username);
  
      const h1 = document.createElement("H1");
      const hText = document.createTextNode(title);

      const p = document.createElement("p");
      const pText = document.createTextNode(content);
      
      const like = document.createElement("p");
      const likeText = document.createTextNode("Like");
      like.style.float = "right";
      
      const comment = document.createElement("p");
      const commentText = document.createTextNode("Comment");
      comment.style.float = "right";
      comment.style.marginLeft = "30px";
      
      h1.appendChild(hText);
      p.appendChild(pText);
      p2.appendChild(p2Text);
      like.appendChild(likeText);
      comment.appendChild(commentText);
      
      p2.style.color = "grey";

      newDiv.appendChild(p2);
      newDiv.appendChild(h1);
      newDiv.appendChild(p);
      newDiv.appendChild(comment);
      newDiv.appendChild(like);
      
      newDiv.style.border = "3px solid #000000";
      newDiv.style.padding = "20px"
      newDiv.style.marginTop = "10px";
      newDiv.style.marginLeft = "180px";
      newDiv.style.width = "80%";
      newDiv.style.overflow = "hidden";
      

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

function likePost() {
  
}

function commentPost() {
  
}