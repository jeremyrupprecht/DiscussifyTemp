let socket = io()


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