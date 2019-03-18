var auth = {
  sid: '<your sid>',
  token: '<your token>'
}

const client  = require('twilio')(auth.sid, auth.token);
const to      = '<your telephone number>';
const from    = '<telephone number got from twilio>';
const api_url = 'https://api.twilio.com/2010-04-01/Accounts/'+auth.sid+'/Calls.json';

client.calls.create({
  url: api_url,
  to: to,
  from: from,
  timeout: 60,
});