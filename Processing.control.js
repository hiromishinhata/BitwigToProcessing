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

var reConn;

function init()
{
  host.getMidiInPort(0).setMidiCallback(onMidi);
  host.getMidiInPort(0).setSysexCallback(onSysex);

  host.connectToRemoteHost('127.0.0.1', 42000, function(connection) {

    reConn = connection;

    reConn.setReceiveCallback(onDataReceived);

    var messagetxt = 123 + " " + 321 + " " + 456;
    reConn.send(messagetxt.getBytes());
    println("Data Sent")
  });
}

function onDataReceived(data)
{
  println(data);
}

function onMidi(status, data1, data2)
{
    var messagetxt = "status + " " + data1 + " " + data2;
    reConn.send(messagetxt.getBytes());
    println("Midi Data Sent")
}

function onSysex(data)
{
}

function exit()
{
}
