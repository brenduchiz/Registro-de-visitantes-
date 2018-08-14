var api_key = 'fbf3c54d45c9d41038f9b3922256b260-7efe8d73-cb18e826';
var domain = 'sandbox7dc52ab99624425e862f1b77f3672e27.mailgun.org';
var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});
 
var data = {
  from: 'Excited User <me@samples.mailgun.org>',
  to: 'serobnic@mail.ru',
  subject: 'Hello',
  text: 'Testing some Mailgun awesomeness!'
};
 
mailgun.messages().send(data, function (error, body) {
  console.log(body);
});