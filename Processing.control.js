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

function init()
{
  host.getMidiInPort(0).setMidiCallback(onMidi);
  host.getMidiInPort(0).setSysexCallback(onSysex);

  reSocket = host.createRemoteConnection("Testbed", 42000)
  reSocket.setClientConnectCallback(function (cConn)
  {
    clientConn = cConn;
    clientConn.setReceiveCallback(function (data)
    {
      println(arguments.length);
      println("Client Data In");
      println(data);
    });
    clientConn.setDisconnectCallback(function ()
    {
      println("Client disconnected");
    });
    println("Client connected");
    var test = "Ping";
    clientConn.send(test.getBytes());
  });

  host.connectToRemoteHost('127.0.0.1', 42001, function (conn)
  {
    remoteConn = conn;
    println("RemotHost connected");
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
    remoteConn.send(messagetxt.getBytes());
    println("Midi Data Sent")
}

function onSysex(data)
{
}

function exit()
{
  try {
    if (reSocket) {
      if (clientConn) {
        clientConn.disconnect();
      }
      delete reSocket;
    }
  } catch(e) {
    //Nothing to do here
  }
  try {
    if (remoteConn) {
      remoteConn.disconnect();
      delete remoteConn;
    }
  } catch(e) {
    //Nothing to do here
  }
}
