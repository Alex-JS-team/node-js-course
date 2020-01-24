const fs = require('fs');

const root = __dirname + '/root';

function readDir(dir) {
  fs.readdir(dir, function (err, items) {
    console.log(items)
  })
}

readDir(root);
