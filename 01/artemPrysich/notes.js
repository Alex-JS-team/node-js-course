const fs = require('fs');
const notes = 'notes.json'

let readNotes = () => {
     let data = fs.readFileSync(notes, "utf8");
       console.log(data);
    
}

let addNotes = () => {
    fs.readFile(notes, function (err, data) {
    var note = data !="" ? JSON.parse(data) : []
    sendObject = {
        title : process.argv[3],
        body : process.argv[4]
    };
    let dublicate = note.find(n => n.title === sendObject.title)
    if(dublicate){
        console.log("Sorry, this element is alredy in JSON file")
    }
    else{
    note.push(sendObject)
    fs.writeFile(notes, JSON.stringify(note, null, 2), ()=>{})}
})

    
}


let deleteNotes = ()=> {
    fs.readFile(notes, function (err, data) {
        var note = data !="" ? JSON.parse(data) : []
        sendObject = {
            title : process.argv[3],
            body : process.argv[4]
        };
        let dublicate = note.filter(n => n.title !== sendObject.title);
        console.log(typeof dublicate, dublicate)
        if(dublicate.length !== note.length)
            fs.writeFile(notes, JSON.stringify(dublicate, null, 2), ()=>{})
        
        else{
            console.log("Element is missing ");
        }

  });
}

let detailNote = () => {
    fs.readFile(notes, function (err, data) {
        var note = data !="" ? JSON.parse(data) : []
            note.forEach(element => {
                console.log(element.title);
            });
        }) 

}
module.exports =  { addNotes ,
                    deleteNotes,
                    readNotes,
                detailNote }