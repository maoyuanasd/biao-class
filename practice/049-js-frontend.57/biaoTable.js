// table插件开始
;
(function () {
    'use strict';
    
    //全文变量备用
    let table, tbody, thead, struc, list, act;
    // 暴露插件全局变量
    window.biaoTable =function(...args){
        boot(...args);
        return{render};
    }
    /**
     * 启动
     * @param {string} tableSelector 
     * @param {Object} structure 
     * @param {Array} arr 
     * @param {Object} action 
     */
    function boot(tableSelector, structure, arr, action) {
        // 更新各种全文变量
        table = document.querySelector(tableSelector);
        struc = structure;
        list = arr;
        act = action;
        tbody = table.querySelector('tbody');
        thead = table.tHead;
       
        // 直接渲染
        render();

    }
    /**
     * 总渲染
     */
    function render() {
        
        renderHead();
        renderBody();
    }
    /**
     * 渲染thead
     * 
     * 根据 structure渲染thead
     */
    function renderHead() {
        thead.innerHTML='';
        // 初始化组装字符串
        let html = '';

        // 循环struc中的每一条
        for (let key in struc) {
            // 以 name:'姓名' 为例
            // 此时key为'name'
            // 意味着structure[key]为'姓名'
            // 意味着最后生成的字符串为'<th>姓名</th>'
            html += `<th>${struc[key]}</th>`;
        }
        // 如果传了个性行为就再加一个表头项
        if (act) {

            html += `<th>操作</th>`;
        }
        // 在thead内填充组装好的字符串
        thead.innerHTML = html;
    }
    /**
     * 渲染tbody
     * 使用list渲染tbody（通过struc来限制渲染的数量和属性）
     */
    function renderBody() {
        tbody.innerHTML='';
        // 循环每一条数据
        list.forEach((it, index) => {
            if (it==null)
            return;
            // 给每一条数据写入一个id,方便定位
            it.id = index;
            // 创建表格行
            let tr = document.createElement('tr');
            // 初始化tr的组装字符串
            let html = '';
            // 循环当前数据里面的数据
            for (let key in struc) {
                // 以struc为结构,获取所对应的数据
                html += `<td>${it[key] || '-'}</td>`;
            }
            // 如果传了个性行为就就创建按钮
            if (act) {
                //初始化按钮的字符串
                let btn = ''
                act.forEach(obj => {
                    // 获取到按钮的中文名,并且写入
                    btn += `<button class=${obj.class}>${obj.name}</button>`;
                });
                html += `<td>${btn}</td>`;
            }
            // 加工完的数据,写入TR
            tr.innerHTML = html;
            // 在tbody最后追加tr
            tbody.appendChild(tr);
            // 为个性行为的按钮绑定事件
            if (act) {
                act.forEach(obj => {
                    tr
                        .querySelector([`.${obj.class}`]) // 现通过类名选中按钮
                        .addEventListener('click', e => {
                            // 此处的obj.action(it.id, tr, index);就是传过来的function(){...}函数本身
                            // 后面的小括号触发了函数，并将其所在行和对应的数据索引回传回去
                            // 分别传送了数据的id,每次循环的行元素,每次循环的索引
                            obj.action(it.id, tr, it);
                        });
                });
            }
        });
    }
})();