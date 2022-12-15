let socket = io()

let address2 = window.location.href;
var parts2 = address2.split("?");
var result2 = parts2[1];

document.getElementById("sidebarUserName").innerHTML = result2;


socket.on("updatePosts", ({title, content, community, username}) => {
    
    const p2 = document.createElement("p");
    const p2Text = document.createTextNode("posted by " + username + " in " + community);

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
    
})

function filterFunc()
{
    var input, filter, prehs, hs, i, txtValue;
    input = document.getElementById("search");
    filter = input.value.toUpperCase();
    hs = document.getElementsByTagName("H1");
    for (i = 0; i < hs.length; i++) {
        txtValue = hs[i].textContent || hs[i].innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            hs[i].parentNode.style.display = "";
        } else {
            hs[i].parentNode.style.display = "none";
        }
    }
}

// Can export this to the community page as this button exists there too

function createCommunity() {
  console.log("create community!")
  
  // send socket event to server that a new community has been created
  
}