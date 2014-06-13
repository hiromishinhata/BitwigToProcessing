// You have to first start Bitwig Studio with the Processing Controller Script loaded.
// Then start this Client to start a "Ping" being sent back and forth on connection.

import processing.net.*; 
Client myClient; 
 
void setup() { 
  frameRate(1);
  size(200, 200); 
  myClient = new Client(this, "127.0.0.1", 42000); 
} 
 
void draw() { 
  if (myClient.available() > 0) { 
     byte[] Bytes = myClient.readBytes();
     println("Received Data:\n");
     println(str(char(Bytes)));
     // A "header" has to be sent first, containing the length of the byte array of data
     // It is sent as 4 bytes which together build a 32 Bit integer:
     myClient.write((Bytes.length >> 24) & 0xFF);
     myClient.write((Bytes.length >> 16) & 0xFF);
     myClient.write((Bytes.length >> 8) & 0xFF);
     myClient.write(Bytes.length & 0xFF);
     for(int i=0; i<Bytes.length; i++)
     {
       // With the header gone, we can send the data as bytes:
       myClient.write(Bytes[i]);
     }
     println("\nSent Data back to Host...");
  } 
} 
