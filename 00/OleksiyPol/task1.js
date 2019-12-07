const fs = require("fs")

let height = process.argv[2];
let hash = '#';
let space = " ";
for (let i=1; i<=height; i++){
let string = space.repeat(height-i) + hash.repeat(i)+space+hash.repeat(i)+"\n";
  fs.appendFileSync("mario.txt", string)

}
