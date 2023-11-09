const express = require('express')
const app = express()
const cors = require('cors')
const http = require('http')
const {Server} = require('socket.io')
const server = http.createServer(app)

const PORT=3001

app.use(cors())

const io = new Server(server,{
    cors:{
        origin:'http://localhost:3000',
        methods:['GET','POST']
    }
})


io.on("connection",(socket)=>{
    // console.log(`User Connected: ${socket.id}`)

    socket.on('send_message',(data)=>{
        socket.broadcast.emit("receive_data",data)
    })
})

server.listen(PORT,()=>{
    console.log(`http://localhost:${PORT}`)
})

