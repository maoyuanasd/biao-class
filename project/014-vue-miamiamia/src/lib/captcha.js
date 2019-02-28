import api from './api'
export function send(sendBy,receiver,onSend){
    
      let action;
      if (sendBy == "phone") {
        action = "sms";
      } else {
        action = "mail";
      }
    return  api(`captcha/${action}`, {
        [sendBy]:receiver
      }).then(r => {
          let code=atob(r.data.result);
         onSend && onSend(code);
         return code
      });
}