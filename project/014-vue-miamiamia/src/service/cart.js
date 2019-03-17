import session from '../lib/session'
import store from '../lib/store'
import api from '../lib/api'
import {obj2Arr} from '../lib/helper'
let localCart={};
const callbackPool=[];
const output={
    change(product_id,count,product_snapshot,prop,user_id,sign){
        if(!user_id)
        user_id=session.user().id || '';
        if(!localCart[product_id]){
            localCart[product_id]={product_id,count,product_snapshot,prop,user_id}
        }else{
            if(count)
            localCart[product_id].count+=count;
        }
        if(sign=='++'){
            localCart[product_id].count++;
        }
        if(sign=='--'){
            localCart[product_id].count--;
        }
        if(localCart[product_id].count<=0)
        this.remove(product_id);
        this.sync();
        this.callPool();
    },
    sync(){
        if(session.loggedIn())
        this.syncCloud();
      this.syncLocal();
    },
    syncCloud(){
      let idList=[];
     this.getCloud().then(r=>{
         let data=r.data ||[];
         data.forEach(it => {
            idList.push(it.id); 
         });
         this.clearCloud(idList);
         this.overwriteCloud();
     })
    },
    overwriteCloud(){
        api('cart/create_many',{data:obj2Arr(localCart)})
    },
    clearCloud(idList){
        if(!idList.length)
        return;
       return api('cart/delete_many',{in:idList})
    },
    syncLocal(){
           store.set('cart',localCart);
    },
    getCloud(param = {}){
        return api('cart/read',{...param,where:{and:{user_id:session.user().id}}});
    },
    restoreCloud(){
        this.getCloud({key_by:'product_id'}).then(r=>{
            localCart=r.data ||{};
            this.syncLocal();
            this.callPool();
        })
    },
    onChange(fn){
        if(callbackPool.find(it=>{fn==it}))
        return;
       callbackPool.push(fn); 
    },
    callPool(){
        callbackPool.forEach(fn => {
            fn({...localCart});
        });
    },
    restore(){
        this.restoreLocal();
        this.callPool();
    },
    restoreLocal(){
        localCart=store.get('cart') || {};
    },
    remove(product_id){
       delete localCart[product_id];
       this.callPool();
    },
    clear(){
        localCart={};
    localStorage.removeItem('cart');

        this. syncLocal();
        this.callPool();
    },
    get(){
        return {...localCart};
    },
    productCount(){
        return Object.keys(localCart).length;
    }

};

init();
function init(){
   


   output.restore();
   if (session.loggedIn())
   output.restoreCloud();
}


export default output;