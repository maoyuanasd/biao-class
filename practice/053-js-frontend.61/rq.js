;(function(){
    'use strict';
    window.rq={get,post};
    function get(url,onSuccess, onError){
        send(url,'get',null,onSuccess, onError)
    }
    function post(){
        send(url,'get',data,onSuccess, onError)
    };
    function send(url,method,data,onSuccess, onError){
        let http= new XMLHttpRequest();
        http.open(method,url);
        http.send();
        http.addEventListener('load',()=>{
           let  data =JSON.parse(http.responseText);
             onSuccess && onSuccess(data);
          })
    }
})();