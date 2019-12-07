let fs = require('fs');
// mario tower 
let  ch = '', sum ='', result = '';
for(let i = 0 ; i < 20; i++){
    let str = ' ';
    for(let j = i; j <20; j++){
        
        str += " ";
    }
    ch+='#';
    sum = str+=ch;
    result = sum +'\t'+ch;
    console.log(result);
    fs.writeFile('file.txt', result +='\n' ,{flag: 'a'},(err) => {
        if(err){
            console.log(err);
            return;
        }
    } );
 }




    
    