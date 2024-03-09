const net = require('net');
const fs = require('fs');

// Counting number of connections
let countHosts = 0;

// Connect to the server
const server = net.createServer((socket) => {
    console.log("Client connected");

    // Set encoding to handle starting data
    socket.setEncoding("utf-8");

    // Handle incoming data from the client
    socket.on("data", (data) => {
        console.log("Recieved: ", data);

        try {
            // Save logs of connected hosts
            const clientIP = socket.remoteAddress;
            const clientPort = socket.remotePort;
            const log = String(`# ${++countHosts} ${clientIP}:${clientPort}\n`);

            fs.writeFile("./logs.txt", log, {flag: 'a+'}, (err) => {
                if (err) {
                    throw new Error(err);
                }
            });
        } catch(err) {
            console.error(err);
        }

        // Echo back the recieved data to the client
        socket.write(data);
    });

    // Handle client disconnection
    socket.on("end", () => {
        console.log("Client disconnected");
    });
});

// Handle server errors
server.on('error', (err) => {
    console.error('Server error:', err.message);
});

// Set the server to listen on specific port and host
const PORT = 5000;
const HOST = '192.168.100.6';

// binding happens here
server.listen(PORT, HOST, () => {
    console.log('Server listening on ' + HOST + ":" + PORT);
});