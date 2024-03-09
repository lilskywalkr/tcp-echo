const net = require("net");

const CLIENT_MESSAGE = "Hello, server! this is a test message";

// Connect to the server
const client = net.createConnection({ port: 5000 }, () => {
    console.log("Connected to server");

    // Send a message to the server
    client.write(CLIENT_MESSAGE);
});

// Handle errors
client.on("error", (err) => {
    console.error('Client error: ', err.message);
})

// Handle data recieved from the server
client.on('data', (data) => {
    console.log("Received from the server: ", data.toString());

    // Close the connection after reveiving data
    client.end();
});

// Handle conenction termination
client.on("end", () => {
    console.log("Disconnection from the server");
});