import axios from 'axios';
let appKey = '92016e8ba54b0492c7cd489c80429189245fa9e33e974b93dfe47fd7d7ab2159';

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