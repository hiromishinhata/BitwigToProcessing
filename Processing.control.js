// Processing.control.js

loadAPI(1);

host.defineController("Processing", "Processing", "1.0", "7e410280-e269-11e3-8b68-0800200c9a66");
host.defineMidiPorts(1, 1);

String.prototype.getBytes = function () {
  var bytes = [];
  for (var i = 0; i < this.length; ++i) {
    bytes.push(this.charCodeAt(i));
  }
  return bytes;
};

var clientConn;
var clientIsConnected = false;
var remoteConn;
var hostIsConnected = false;

function init()
{
  host.getMidiInPort(0).setMidiCallback(onMidi);
  host.getMidiInPort(0).setSysexCallback(onSysex);

  // Create the main Socket Connection:
  reSocket = host.createRemoteConnection("Testbed", 42000)
  reSocket.setClientConnectCallback(function (cConn)
  {
    clientConn = cConn;
    clientIsConnected = true;
    println("Client connected");

    // Set Callback for Incoming Data:
    clientConn.setReceiveCallback(function (data)
    {
      println("Client Data Incomming\n");
      println("Buffer Length: " + data.length + "\n" );
      // Re-assemble the Data from the incoming Byte Array:
      var clientData = "";
      for (var i=0; i<data.length; i++) {
        println("Byte " + i + ":  " + data[i]);
        clientData += String.fromCharCode(data[i])
      }
      println("\nReconstructed String: " + clientData);
    });
    clientConn.setDisconnectCallback(function ()
    {
      clientIsConnected = false;
      println("Client disconnected");
    });

    // Send a test "Ping" :-)
    var test = "Ping";
    clientConn.send(test.getBytes());
  });

  host.connectToRemoteHost('127.0.0.1', 42001, function (conn)
  {
    remoteConn = conn;
    hostIsConnected = true;
    println("RemoteHost connected");
    remoteConn.setReceiveCallback(onDataReceive);
    remoteConn.setDisconnectCallback(onDisconnect);

    println("Client connected");
    var test = "Pong";
    remoteConn.send(test.getBytes());
  });
}

function onDataReceive (data)
{
  println(arguments.length);
  println("onDataReceive");
}

function onDisconnect (data)
{
  println("onDisconnect");
}

function onMidi(status, data1, data2)
{
    var messagetxt = status + " " + data1 + " " + data2;

    if (hostIsConnected) {
      remoteConn.send(messagetxt.getBytes());
      println("Midi Data Sent to Server")
    }
    if (clientIsConnected) {
      clientConn.send(messagetxt.getBytes());
      println("Midi Data Sent to Client")
    }
}

function onSysex(data)
{
}

function exit()
{
  // nothing to do here ;-)
}
