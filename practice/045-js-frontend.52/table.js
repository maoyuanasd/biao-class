;
(function () {
    'use strict';
    window.table = {
        boot
    }
    let table, tbody, thead, list, struct;

    function boot(tableSelector, structure, arr) {
        table = document.querySelector(tableSelector);
        list = arr;
        struct = structure;
        thead = table.tHead;
        tbody = table.tBodies[0];
        render();
    }

    function render() {
        rendHead();
        rendBody();
    }

    function rendHead() {
        for (let key in struct) {
            let th = document.createElement('th');
            let html;
            html = struct[key];
            th.innerHTML = html;
            thead.appendChild(th);
        }
    }

    function rendBody() {
        list.forEach(it => {
            let tr = document.createElement('tr');
            let html = '';
            for (let key in struct) {
                html += `<td>${it[key] || '-'}</td>`;
                tr.innerHTML = html;
            }
            tbody.appendChild(tr);
        });
    }
})();