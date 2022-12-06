const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const path = require('path');
const { Socket } = require('socket.io');
const http = require('http').createServer(app);
const io = require('socket.io')(http);

var server = require('http').createServer(app);

const users = []

app.get('/', (req,res) => {
    res.sendFile(__dirname + '/index.html');
})

app.get('/style.css', (req, res) => {
    res.sendFile(__dirname + '/style.css');
})

app.get('/loged_in.js', (req, res) => {
    res.sendFile(__dirname + '/loged_in.js');
})

app.get('/index.html', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

app.get('/signup.html', (req, res) => {
    res.sendFile(__dirname + '/signup.html');
})

//when a client is connected
io.on('connection', (socket) => 
{
    socket.on('signup', async ({username, password}) => {
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = {name: username, password: hashedPassword}
        users.push(user)
        console.log("-------------------------------------------------------------------");
        console.log(users);
        io.emit("successfulSignUp")
    })

    socket.on("reconfirmPass", (username) => {
        io.emit("reconfirmYourPass", (username))
    })

    socket.on('login', async ({username, password}) => {
        const user = users.find(user => user.name == username)
        if(user == null)
        {
            console.log("+++++++++++++++++++++++++")
            console.log('Cannot find user')
            io.emit('usrNotFound', (username))
        }
        else
        {
            if(await bcrypt.compare(password, user.password))
            {
                console.log("+++++++++++++++++++++++++")
                console.log('Success')
                io.emit('succesfulLogin', (username))
            }
            else
            {
                console.log("+++++++++++++++++++++++++");
                console.log('Not Allowed')
                io.emit('NotAllowed', (username))
            }
        }
    })
});

http.listen(3000)