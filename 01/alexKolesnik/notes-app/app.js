[{ "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit", "text": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto" }, { "title": "qui est esse", "text": "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla" }, { "title": "ea molestias quasi exercitationem repellat qui ipsa sit aut", "text": "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut" }, { "title": "eum et est occaecati", "text": "ullam et saepe reiciendis voluptatem adipisci\nsit amet autem assumenda provident rerum culpa\nquis hic commodi nesciunt rem tenetur doloremque ipsam iure\nquis sunt voluptatem rerum illo velit" }, { "title": "nesciunt quas odio", "text": "repudiandae veniam quaerat sunt sed\nalias aut fugiat sit autem sed est\nvoluptatem omnis possimus esse voluptatibus quis\nest aut tenetur dolor neque" }, { "title": "dolorem eum magni eos aperiam quia", "text": "ut aspernatur corporis harum nihil quis provident sequi\nmollitia nobis aliquid molestiae\nperspiciatis et ea nemo ab reprehenderit accusantium quas\nvoluptate dolores velit et doloremque molestiae" }, { "title": "magnam facilis autem", "text": "dolore placeat quibusdam ea quo vitae\nmagni quis enim qui quis quo nemo aut saepe\nquidem repellat excepturi ut quia\nsunt ut sequi eos ea sed quas" }, { "title": "Hello", "text": "Hi, I am Alex and I hate php" }, { "title": "Php", "text": "Php it is a boolsheat" }]
const notes = require('./notes')

yargs.command({
    command: 'add',
    describe: 'add new note',
    builder: {
        title: {
            type: String,
            demandOption: true,
            describe: 'set note title'
        },
        text: {
            type: String,
            demandOption: true,
            describe: 'set note body'
        }
        red
    },
    handler({ title, text }) {
        notes.addNote(title, text)
    }
})

yargs.command({
    command: 'delete',
    describe: 'delete note',
    handler() {}
})

yargs.command({
    command: 'list',
    describe: 'list notes',
    handler() {
        notes.listNote()
    }
})



yargs.parse()