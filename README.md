BitwigToProcessing
==================

Remote Connection between Bitwig and Processing

http://processing.org/

A basic example on how to directly connect via TCP either as client or server directly to Bitwig Studio via a Controller Script.
This allows for a lot of interesting things:

 - Directly interact with visual tools like Processing, Cinder, VJ-Software...
 - Directly connect to mobile devices...
 - Directly connect to advanced controllers...
 - Directly connect to other computers in the network...

The data transport is done via byte arrays.
When you send data to Bitwig Studio, you need to first send a 32 bit integer (encoded as 4 bytes) with the lenght of the byte array to follow.

On top of that you can implement whatever data transfer you need...

Cheers,

Tom
