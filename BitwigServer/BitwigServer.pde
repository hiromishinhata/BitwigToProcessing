// Start this server first and then reload the Processing Script in BWS

import processing.net.*;

Server myServer;
int val = 0;

void setup() {
  frameRate(1);
  size(200, 200);
  // Starts a Server on port 42000
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

     // A "header" has to be sent first, containing the length of the byte array of data
     // It is sent as 4 bytes which together build a 32 Bit integer:
     thisClient.write((Bytes.length >> 24) & 0xFF);
     thisClient.write((Bytes.length >> 16) & 0xFF);
     thisClient.write((Bytes.length >> 8) & 0xFF);
     thisClient.write(Bytes.length & 0xFF);
     for(int i=0; i<Bytes.length; i++)
     {
       // With the header gone, we can send the data as bytes:
       thisClient.write(Bytes[i]);
     }
     println("\nSent Data back to Client...");
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
