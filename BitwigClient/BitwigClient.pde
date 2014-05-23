import processing.net.*; 
Client myClient; 
 
void setup() { 
  frameRate(1);
  size(200, 200); 
  // Connect to the local machine at port 5204.
  // This example will not run if you haven't
  // previously started a server on this port.
  myClient = new Client(this, "127.0.0.1", 42000); 
} 
 
void draw() { 
  if (myClient.available() > 0) { 
    //dataIn = myClient.read();
     //myClient.write(dataIn); 
     byte[] Bytes = myClient.readBytes();
     println(str(char(Bytes)));
     myClient.write(Bytes.length);
     myClient.write(Bytes);
  } 
} 
