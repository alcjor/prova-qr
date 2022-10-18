const nacl = require('tweetnacl')
nacl.util = require('tweetnacl-util');

// Generate string
// String -> (encodeUTF8) -> Uint8 array -> (sign) -> Uint8 array -> (decodeBase64) -> String

// Validate
// String -> (encodeBase64) -> Uint8 array -> (open/validate) -> Uint8 array -> 


// Generate keys
// keys = nacl.sign.keyPair()
// publicKey = keys['publicKey']
// secretKey = keys['secretKey']
secretKey = Uint8Array.from([
   53, 188, 117, 240, 209, 200, 220, 178, 225, 120,  61,
  160, 125, 114, 106, 242,  60,  59, 162,  85, 167, 170,
   79, 225, 184, 109, 237,  64,  27, 147, 116, 207, 170,
  149,  47,  71, 132,  14, 198, 150, 237, 102,  44, 117,
  163, 224,  10,  21,  10, 179,  96, 196, 120, 234,  89,
   49,  15, 192, 199, 176, 236, 183,  23,  80
]);

keys = nacl.sign.keyPair.fromSecretKey(secretKey);


// Sign message
encodedString = nacl.util.decodeUTF8("Mílhouse;Vañ;Houten;20/01/99;42")
signedArray = nacl.sign(encodedString, secretKey)
signedString = nacl.util.encodeBase64(signedArray)
console.log(signedString);



// Validate
publicKey = Uint8Array.from([
  170, 149,  47,  71, 132,  14, 198, 150,
  237, 102,  44, 117, 163, 224,  10,  21,
   10, 179,  96, 196, 120, 234,  89,  49,
   15, 192, 199, 176, 236, 183,  23,  80
]);
qrData = signedString
qrDataArray = nacl.util.decodeBase64(qrData)
openArray = nacl.sign.open(qrDataArray, publicKey)
openString = nacl.util.encodeUTF8(openArray)
console.log(openString);



// Generate QR from signed message
var QRCode = require("qrcode-svg");
var qrcode = new QRCode({ 
  content: signedString,
  padding: 4,
  width: 1024,
  height: 1024,
  color: "#000000",
  background: "#ffffff",
  ecl: "H"
});

// console.log(process.argv);
// Low to high ecl: L, M, Q, H

qrcode.save("qr.svg", function (error) {
  if (error) throw error;
  
  console.log("QR Code saved!");
});