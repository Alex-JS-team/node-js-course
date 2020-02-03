const nodemailer = require('nodemailer')

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'webinme.ru@gmail.com',
    pass: '1234567vV'
  }
});

function restorePassword(email, token) {
  const url = `http://localhost:5000/restore/${token}`;
  var mailOptions = {
    from: 'nodejs',
    to: email,
    subject: 'Восстановление пароля',
    html: `
      <p>Для ввостановления пароля перейдите по</p>
      <a href=${url}>ссылке</a> 
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

module.exports = restorePassword;
