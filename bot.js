//NODEJS - npm install ws
let url = "ws://0.0.0.0:28016/YOUR_RCON_PASSWORD_HERE"

const WebSocket = require('ws');

const ws = new WebSocket(url);

const time = 120000 //120 seconds

ws.on('open',() =>
{
        console.log("connected")
})

setInterval(() =>
{
        autoMessage()
},time)

function autoMessage()
{
        ws.send(JSON.stringify({ Message: "serverinfo"}))
}

ws.on('message',(e) =>
{
        convertMessage(JSON.stringify(e))
})

ws.on('error',(e) =>
{
        return false
})

function convertMessage(e)
{
        try
        {
                let test = Buffer.from(JSON.parse(e).data)
                let wtf = test.toString('utf8')
                let a = JSON.parse(wtf).Message
                let obj = JSON.parse(a)

                let queued = obj.Queued
                let players = obj.Players
                let joining = obj.Joining
                let maxplayers = obj.MaxPlayers
                let hostname = obj.Hostname
                let entity = obj.EntityCount

                if(obj.Hostname)
                {
                        let final = "say : <color=green>" + hostname + "</color>\nQUEUED : " + queued + "\nJOINING : " + joining + "\nPLAYERS : " + players + " / " + maxplayers + "\nENTITIES : " + entity

                        ws.send(JSON.stringify({ Message: final }))
                }
        }
        catch
        {
                return false
        }
}
