const nodemailer = require('nodemailer')

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'webinme.ru@gmail.com',
    pass: '1234567vV'
  }
});

function restorePassword(email) {
  var mailOptions = {
    from: 'nodejs',
    to: 'xxx44552@gmail.com',
    subject: 'Восстановление пароля',
    html: `
      <p>Для ввостановления пароля перейдите по</p>
      <a href="wadwad">ссылке</a> 
    `
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error)
    } else {
      console.log(info)
    }
  });
}

restorePassword('xxx44552@gmail.com')

//module.exports = restorePassword;
