const { WebSocketServer } = require('ws');

const wss = new WebSocketServer({ port: 8080 });
console.log('✅ WebSocket server running on ws://localhost:8080');

wss.on('connection', (ws) => {
  console.log('🔵 Client connected');

  ws.on('message', (msg) => {
    console.log('📨 Received from one client:', msg.toString());

    // Broadcast to all *other* clients
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === 1) {
        client.send(msg.toString());
      }
    });
  });

  ws.on('close', () => console.log('🔴 Client disconnected'));
});
