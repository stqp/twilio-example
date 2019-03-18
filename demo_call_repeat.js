var auth = {
  sid: '<your sid>',
  token: '<your token>'
}

const client  = require('twilio')(auth.sid, auth.token);
const from    = '<telephone number which be given from twilio>';
const api_url = 'https://api.twilio.com/2010-04-01/Accounts/'+auth.sid+'/Calls.json';

var users = [];
users.push({name: "Tanaka" , tel: '07012345678'});
users.push({name: "Yamada" , tel: '07097654321'});

for(let user of users){
  client.calls.create({
    url: api_url,
    to: user.tel,
    from: from,
    timeout: 60,
  });
}