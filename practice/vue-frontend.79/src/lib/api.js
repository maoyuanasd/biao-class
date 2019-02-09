import axios from 'axios';
let appKey = 'efcb5f8ab04176be475a1408c30932e1c47d7b79456b4e90400b14a8fe455a10';

export default function api(url, data) {
    let timestamp = Date.now();
    return axios.post(`https://mock.biaoyansu.com/api/1/${url}`, data, {
        headers: {
            'BIAO-MOCK-APP-KEY': appKey,
            'BIAO-MOCK-TIMESTAMP': timestamp,
            'BIAO-MOCK-SIGNATURE': sign(appKey, timestamp)
        }
    }).then(r => {
        return r.data;
    });

}


/**
 * 签名
 * @param appKey 应用的键，可在应用管理中拿到：http://mock.biaoyansu.com/app
 * @param timestamp 时间戳
 * @return {string}
 */
function sign(appKey, timestamp) {
    return btoa(appKey + timestamp);
}