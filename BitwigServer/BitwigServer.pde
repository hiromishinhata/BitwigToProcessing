import processing.net.*;

Server myServer;
int val = 0;

void setup() {
  frameRate(1);
  size(200, 200);
  // Starts a myServer on port 42000
  myServer = new Server(this, 42001); 
}

void draw() {
  val = (val + 1) % 255;
  background(val);
 // Get the next available client
  Client thisClient = myServer.available();
  // If the client is not null, and has data, send it back
  if (thisClient !=null) {
    byte[] Bytes = thisClient.readBytes();
    println(str(char(Bytes)));
    thisClient.write(Bytes.length);
    thisClient.write(Bytes);
  }   
  
  
  
  //myServer.write(1);
  //myServer.write(byte(val));
}

// ServerEvent message is generated when a new client connects 
// to an existing server.
void serverEvent(Server someServer, Client someClient) {
  println("We have a new client: " + someClient.ip());
  //println("Data sent: " + someClient.readBytes()); 
}
