let socket = io()

//let myID

let currentCommunity;
let address = window.location.href;
var parts = address.split("?");
let temp = parts[0].split("/");
let communName = temp[3];
var userID = parts[1];


document.getElementById("sideBarUsername").innerHTML = userID;

// grab username from database to display
// ...

console.log(communName);
if (true) {
  currentCommunity = {
    id: communName,
  };
}
console.log("The community I'm in is " + currentCommunity.id);

console.log(parts);

document.getElementById('communityTitle').innerHTML = currentCommunity.id;

// give posts a unique id, need to integrate with database

var postId = 0          // id needs to be saved with each post, also saved here should be the amount of likes a post gets (under rating)
var commentId = 0       // id needs to be saved with each comment

socket.on("updatePosts", ({title, content, community, username}) => {
  if(community === currentCommunity.id)
    {
      
      // save the username, title and content information in the database
      
      // create post to display
      
      const newDiv = document.createElement("div");
      newDiv.id = "post " + postId
      console.log(newDiv.id)
      
      const p2 = document.createElement("p");
      const p2Text = document.createTextNode("posted by " + username);
  
      const h1 = document.createElement("H1");
      const hText = document.createTextNode(title);

      const p = document.createElement("p");
      const pText = document.createTextNode(content);
      
      const likeButton = document.createElement("button");
      likeButton.innerHTML = "Like"
      likeButton.className = "likeButton"
      likeButton.addEventListener("click", function() {
         likePost(postId) 
      }); 
      
      const commentButton = document.createElement("button");
      commentButton.innerHTML = "Comment"
      commentButton.className = "likeButton"
      commentButton.style.width = "90px"
      commentButton.addEventListener("click", function() {
         commentPost(commentId,postId) 
      }); 
    
      h1.appendChild(hText);
      p.appendChild(pText);
      p2.appendChild(p2Text);
      
      p2.style.color = "grey";

      newDiv.appendChild(p2);
      newDiv.appendChild(h1);
      newDiv.appendChild(p);
      newDiv.appendChild(commentButton);
      newDiv.appendChild(likeButton);
      
      newDiv.style.border = "3px solid #000000";
      newDiv.style.padding = "20px"
      newDiv.style.marginTop = "10px";
      newDiv.style.marginLeft = "180px";
      newDiv.style.width = "80%";
      newDiv.style.overflow = "hidden";
            
      newDiv.addEventListener("click", function() {
        viewPost(postId)
      }); 
    

      // display post

      document.body.appendChild(newDiv);

      document.getElementById('modal-container-HTP').classList.remove('show'); 
      
      postId++;
      
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

  /*
  socket.emit("posted", ({title: title, content: content, community: currentCommunity.id, username: userID}));
  */

  fetch('http://localhost:3000/create-post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        author: "tempAuthor",
        community: "tempCommunity",
        title: "tempTitle",
        rating: "tempRating",
        body: "tempBody",
        rating: 0
      })
    })
    .then(res => {
      if (res.ok) {
        console.log("OK! " + res.status)  
        
        showUpdatedPosts()

      } else if (res.status === 401) {
        console.log("User unauthenticated!")
      }
      //console.log(res. status)
      //return res.json()   
    })        

}

function showUpdatedPosts() {
  console.log("updated!!!")
}


function likePost(postId) {
  console.log("liked! with id:" + postId)
  
  socket.emit("postLiked", ({postId: 0}))
  
}

function commentPost(commentId, postID) {
    console.log("commented! with id: " + commentId + " on post!" + postID)
}

function viewPost(postId) {
  console.log("post viewed! with id:" + postId)
}