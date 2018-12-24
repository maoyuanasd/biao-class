;
(function () {
    'use strict';
    window.table = {
        boot
    }
    let table, tbody, thead, list, struct, act;

    function boot(tableSelector, structure, arr, action) {
        table = tableSelector;
        struct = structure;
        list = arr;
        act = action;
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
        if (act) {
            html += `<th>操作</th>`
        }
        thead.innerHTML = html;
    }

    function renderBody() {
        list.forEach((it, index) => {
            let tr = document.createElement('tr');
            let html = '';
            for (let key in struct) {
                html += `<td>${it[key] || '-'}</td>`;
            }
            if (act) {
                let actHtml = '';
                act.forEach(serial => {
                    actHtml += `<button class=${serial.class}>${serial.name}</button>`;
                });
                html += `<td>${actHtml}</td>`;
            }
            tr.innerHTML = html;
            tbody.appendChild(tr);
            if (act) {
                act.forEach(serial => {
                    let btn = tr.querySelector(`.${serial.class}`);
                    // let btn = tr.querySelector(`button`);
                    btn.addEventListener('click', () => {
                        serial.action(tr, index,it);
                    });
                })
            }
        });
    }
})();