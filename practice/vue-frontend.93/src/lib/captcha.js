/**
 * 
 * @param {string} sendBy (phone|mail)
 * @param {string} receiver  手机或邮箱
 * @param {*} onSend 回调函数
 */
import api from './api'
export function send(sendBy,receiver,onSend){
    if (sendBy == "phone") {
        action = "sms";
      } else {
        action = "mail";
      }
     
      let action;
    return  api(`captcha/${action}`, {
       [sendBy]:receiver
      }).then(r => {
        let code=atob(r.data.result);
        onSend && onSend(code);
        return code;
      });
}