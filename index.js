const WebSocket	= require('ws');
const socketServer = new WebSocket.Server({port: 8080});

var connectionNumber = 0;
var chatReady = false;

function ChatMembers() {
    this.player1 = {
        connection: null
    }
    this.player2 = {
        connection: null
    }
    this.player3 = {
        connection: null
    }
}

var chatRoom = new ChatMembers();

function sendMessage(connection, message) { 
    console.log("Sending message: ", message);
    connection.send(JSON.stringify(message));
}

socketServer.on('connection', function connection(ws) {
    
    console.log('connection established');
    console.log(chatReady);
    
    
    ws.on('message', function incoming(_message) {
        if (chatReady === true) {
            let message = JSON.parse(_message);
            console.log("Recieved message: %s", JSON.stringify(message));
            sendMessage(chatRoom.player1.connection, message);
            sendMessage(chatRoom.player2.connection, message);
            //sendMessage(chatRoom.player3.connection, message)
        }
    });
    ws.on('close', function close() {
        console.log('connection closed')
        player1.connection = null;
        player2.connection = null; 
    });
    

    if (chatRoom.player1.connection === null) {
        chatRoom.player1.connection = ws;
        console.log('user1 has connected')
        console.log(chatReady);
        return
    }
    if (chatRoom.player2.connection === null) {
        chatRoom.player2.connection = ws;
        console.log('user2 has connected')
        chatReady = true;
        console.log(chatReady);
    }
});

console.log("Server listening on port 8080");
