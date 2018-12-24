;
(function () {
    'use strict';
    window.table = {
        boot
    }
    let table,tbody,thead,struc,list,act;
    function boot(tableSelector,structure,arr,action){
         table=document.querySelector(tableSelector);
         struc=structure;
         list=arr;
         act=action;
         tbody=table.querySelector('tbody');
         thead=table.tHead;
         render();

    }
    function render(){
        renderHead();
        renderBody();
    }
    function renderHead(){
        let html='';
        for(let key in struc){
            html+=`<th>${struc[key]}</th>`;
        }
        html+=`<th>操作</th>`;
        thead.innerHTML=html;
    }
    function renderBody(){
        list.forEach((it,index) => {
            it.id=index;
            let tr=document.createElement('tr');
            let html='';
            for(let key in struc){
               html+=`<td>${it[key] || '-'}</td>`;
            }
            if(act){
                let btn=''
              act.forEach( obj => {
                  btn+=`<button class=${obj.class}>${obj.name}</button>`;
              });
              html+=`<td>${btn}</td>`;
            }
            tr.innerHTML=html;
            tbody.appendChild(tr);
            if(act){
                act.forEach(obj => {
                    tr
                       .querySelector([`.${obj.class}`])
                       .addEventListener('click',e=>{
                           obj.action(it.id,tr,index);
                       });
                });
            }
        });
    }
})();