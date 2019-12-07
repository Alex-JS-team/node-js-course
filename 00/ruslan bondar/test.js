const fs = require('fs');

const n = 10;

for (var i = 0; i < n; i++) {
    var str = '';
    for (var j = 1; j < n - i; j++) {
        str = str + ' ';
    }
    for (var k = 1; k <= (i + 1); k++) {
        str = str + '*';
    }
    // console.log(str);

    // fs.writeFileSync('test.txt', '');
    fs.appendFileSync('test.txt', str); 
}

// let fileContent = fs.readFileSync("test.txt", "utf8");
// console.log(fileContent);