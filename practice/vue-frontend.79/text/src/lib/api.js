import axios from 'axios';

let appKey = 'f4ef565034e8e588510a0b5d9c0c50f2f57b53d80663136359b63f169ab70d34';

window.api = api;

export default function api (url, data) {
  let timestamp = Date.now();

  return axios.post(`https://mock.biaoyansu.com/api/1/${url}`, data, {
    headers : {
      'BIAO-MOCK-APP-KEY'   : appKey,
      'BIAO-MOCK-TIMESTAMP' : timestamp,
      'BIAO-MOCK-SIGNATURE' : sign(appKey, timestamp),
    },
  }).then(r => {
    return r.data;
  });
}


/**
 * 签名
 * @param appKey 应用的键，可在应用管理中拿到：https://mock.biaoyansu.com/app
 * @param timestamp 时间戳
 * @return {string}
 */
function sign (appKey, timestamp) {
  return btoa(appKey + timestamp);
}
