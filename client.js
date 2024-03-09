const net = require("net");

// Message to send to the server
const CLIENT_MESSAGE = "Hello, server! this is a test message";
// IP address of the server host
const SERVER_ADDRESS = String("192.168.100.6")

// Connect to the server
const client = net.createConnection({ port: 5000, host: SERVER_ADDRESS }, () => {
    console.log("Connected to server");

    // Send a message to the server
    client.write(CLIENT_MESSAGE);
    console.log("Size of the sent data: ", CLIENT_MESSAGE.length);
});

// Handle errors
client.on("error", (err) => {
    console.error('Client error: ', err.code);
})

// Handle data recieved from the server
client.on('data', (data) => {
    console.log("Received from the server: ", data.toString());
    console.log("Size of the received data: ", data.toString().length)

    // Close the connection after reveiving data
    client.end();
});

// Handle conenction termination
client.on("end", () => {
    console.log("Disconnection from the server");
});