;
(function () {
    'use strict';
    window.table = {
        boot
    }
    let table, tbody, thead, list, struct;

    function boot(tableSelector, structure, arr) {
        table = tableSelector;
        struct = structure;
        list = arr;
        table = document.querySelector(tableSelector);
        tbody = table.querySelector('tbody');
        thead = table.tHead;
        render();
    }

    function render() {
        renderHead();
        renderBody();
    }

    function renderHead() {
        let html = '';
        for (let key in struct) {
            html += `<th>${struct[key]}</th>`;
        }
        thead.innerHTML = html;
    }

    function renderBody() {
        list.forEach(it => {
            let tr = document.createElement('tr');
            let html = '';
            for (let key in struct) {
                html += `<td>${it[key] || '-'}</td>`;
            }
            tr.innerHTML = html;
            tbody.appendChild(tr);
        });
    }
})();