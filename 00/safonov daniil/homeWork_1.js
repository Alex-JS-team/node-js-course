const fs = require('fs');

if(fs.existsSync("marioPiramid.txt")){
    fs.unlinkSync('marioPiramid.txt');
}

const heightPyramid = process.argv[2];
for (let i = 1; i < heightPyramid; i++) {
    let spaceRow = heightPyramid - i;
    let result = " ".repeat(spaceRow) + "#".repeat(i) + " " + "#".repeat(i) + " ".repeat(spaceRow) + '\n';
    fs.appendFileSync("marioPiramid.txt", result);
}

let fileContent = fs.readFileSync("marioPiramid.txt", "utf8");
console.log(fileContent);

