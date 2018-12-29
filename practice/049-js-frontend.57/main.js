let list = [{
    username: '王花花',
    email: 'whh@qq.com',
    balance: 120
}, {
    username: '李拴蛋',
    email: 'lsd@qq.com',
    balance: 125
}, ];
let listHead = {
    username: '用户名',
    email: '邮箱',
    balance: '余额',
};
let userFrom = document.querySelector('#user-form');
let bt,bf;
boot();
function boot(){
   prepareForm();
   prepareTable();
}
function prepareForm(){
bf = biaoForm('#user-form', onSubmit);
  
}
function prepareTable(){
    let action = [{
        name: '删除',
        class: 'delete',
        action: (id, tr, it) => {
            list[id] = null
            tr.remove();
        }
    }, {
        name: '修改',
        class: 'change',
        action: (id, tr, it) => {
            bf.setData(list[id]);
        }
    }]
    
    bt = biaoTable('#user', listHead, list, action);
}
function onSubmit(data) {
    if (isAllNull() == true) 
        return;
        let idInput = userFrom.querySelector('[name=id]');
        let index = idInput.value;
        // if (index) {
        //     list[index] = data;
        // } else {
        //     list.push(data);
        // }
        index ? list[index] = data:list.push(data);
        bt.render();
}

function isAllNull() {
    let inputs = userFrom.querySelectorAll('input');
    let nullTime = 0;
    inputs.forEach(e => {
        if (e.value == '')
            nullTime++;
    })
    return nullTime == inputs.length;
    // if (nullTime == inputs.length) {
    //     return true;
    // } else {
    //     return false;
    // }
}