//const jwt = require("jwt")
const jwt = require('jsonwebtoken');
const name = "Arbeena";
const secretKey ="124";
const cipertext = jwt.sign(name,secretKey);

const finalResp = jwt.verify(cipertext,secretKey)
console.log("your ciper text",cipertext);
console.log(finalResp);