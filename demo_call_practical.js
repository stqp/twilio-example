var auth = {
  sid: '<your sid>',
  token: '<your token>'
}


const client  = require('twilio')(auth.sid, auth.token);
const from    = '<telephone number which be given from twilio>';
const api_url = 'https://api.twilio.com/2010-04-01/Accounts/'+auth.sid+'/Calls.json';


// Return a telephone number list of on-call users.
function get_call_list(){
  var list = [];
  list.push('<telephone number 1');
  list.push('<telephone number 2');
  list.push('<telephone number 3');
  return list;
}


// This is just a syntax sugar.
function log(msg){
  console.log(msg);
}


async function sleep(t) {
  return await new Promise(r => {
    setTimeout(() => {
      r();
    }, t);
  });
}


async function main(call_list){

  for(let to of call_list){

    try{
      var call = await client.calls.create({
        url: url,
        to: to,
        from: from,
        timeout: 60,
      });

      var res = await client.calls.read();
      log("calling to: " + call.sid);

      var max_wait_time_sec = 240; // seconds.
      let wait_interval_sec = 30;
      let max_loop_num = max_wait_time_sec / wait_interval_sec;

      // Retry calling until the on-call user responsed or succeed maximum retry count.
      for( let i = 0; i < max_loop_num; i++ ) {

        var called = await client.calls(call.sid).fetch();
        log("I watching call status of : " + called.sid);

        if ( called ){
          var stat = called.status;
          log("status is : " + stat); // just for debug.
          
          if ( stat === 'no-answer' ){ break; }
          if ( stat === 'completed' ){ 
            if ( called.AnsweredBy !== 'human' ) { break; } // If machine rensponded, call to next person.
            else { return; } // Human responded, so this calling program will finish.
          }
          
        }

        await sleep(wait_interval_sec * 1000);
        log("I will wait for " + wait_interval_sec + " sec until the call is finished...");

      } 

      log("I got no-answer... So I will call to next person.");
      
    }catch(e){
      log(e); return;
    }
  }

  log("Oops... No one response to my call. The alert may burn down our system...");
}


main(get_call_list());


