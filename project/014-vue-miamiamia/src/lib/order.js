import session from './session'
import api from './api'
export function createOrder(detail){
    let order={detail};
    order.user_id=session.user().id;
    order.sum=orderSum(order.detail);
  return  api('order/create',order).then(r=>r)
}

export function orderSum(detail){
    let sum=0;
    detail.forEach(product => {
        sum+=product.product_snapshot.price*product.count;
    });
    return sum;
}