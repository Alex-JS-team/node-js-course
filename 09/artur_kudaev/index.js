var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/tes-api', {useNewUrlParser: true});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connect..')
  var kittySchema = new mongoose.Schema({
    name: String
  });

  var Kitten = mongoose.model('Kitten', kittySchema);

  var silence = new Kitten({ name: 'Silence' });
  silence.save().then(res=>console.log(res))
  console.log(silence.name);
});