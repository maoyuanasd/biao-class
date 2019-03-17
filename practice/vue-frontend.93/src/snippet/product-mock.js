
import api from '../lib/api'
api('MODEL/ATTACH_MOCK', {
    key  : 'product',
    mock : {
      price        : {
        mocker : 'numberBetween',
        params : [ 5, 30 ],
      },
      total        : {
        mocker : 'numberBetween',
        params : [ 10, 1000 ],
      },
      brand_id       : {
        mocker : 'randomElement',
        params : [ ['1', '5' ,'8','9','10','11']],
      },
      cat_id     : {
        mocker : 'numberBetween',
        params : [ 1, 13 ],
      },
      shipping_fee : {
        mocker : 'numberBetween',
        params : [ 8, 12 ],
      },
      title        : {
        mocker : 'randomElement',
        params : [
          [
            '小马哥湖南麻辣条小零食大礼包儿时混搭混合装一箱',
            '卫龙辣条小面筋280g香辣味零食网红小吃小辣片8090后湖南',
            '网红辣条小零食麻辣儿时手工抖音同款一箱混合装大',
            '卫龙辣条3重口味亲嘴烧300g网红零食儿时回忆湖南重庆麻',
            '卫龙零食大礼包756g量贩装大面筋大辣片小面筋小辣棒魔芋',
            '【卫龙旗舰店】魔芋爽180g*2 魔芋辣条零食素毛肚',
            '重庆陆草垫泡椒臭干子牛板筋辣条小零食小吃好吃的',
            '源氏老式大辣片180*3袋儿时怀旧网红辣条零食大礼包麻辣',
            '卫龙辣条亲嘴豆皮70g*3包辣味零食网红零食辣片湖南重庆特产零食',
            '三只松鼠 好多啦23袋/508g辣条大礼包辣味零食送女友',
          ],
        ],
      },
    },
  });
  