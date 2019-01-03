window.biaoDropsearch = {
    boot
}
let defaultConfig = {
    display: 'name',
}

function boot(select, data, config) {
    let container = document.querySelector(select);
    config = Object.assign({}, defaultConfig, config);
    initDropdown(container, data, config);
    bindFocusEvent(container, data, config);
    bindChickEvent(container, config);
    bindKeyupEvent(container, config);
}

function initDropdown(container, data, config) {
    container.$innerHTML = container.innerHTML = ` <div class="dropdown">
        <div class="filter">
            <input type="search">
        </div>
        <div class="list"></div>
     </div>`;
    let list = container._list = container.querySelector('.list');
    container.$dataArr = data;
    render(container, data, config)
    list.hidden = true;
}

function bindFocusEvent(container, data, config) {
    let input = container._input = container.querySelector('input');
    input.addEventListener('focus', () => {
        list.hidden = false;
    })
}

function render(container, data, config) {
    let list = container._list;
    list.innerHTML = '';
    data.forEach(it => {
        let item = document.createElement('div');
        item.classList.add('item');
        item.innerHTML = it[config.display];
        item.$data = it;
        list.appendChild(item);
    });
    list.hidden = false;
}

function bindChickEvent(container, config) {
    let onSelect = config.onSelect;
    let input = container._input;
    let list = container._list;
    window.addEventListener('click', e => {
        if (e.target.closest('.dropdown')) {
            list.hidden = false;
            if (e.target.closest('.list')) {
                let item = e.target;
                input.value = item.$data[config.display];
                list.hidden = true;
                onSelect && onSelect(item.$data);
            }
        } else {
            list.hidden = true;
        }
    });
}

function bindKeyupEvent(container, config) {
    let input = container._input;
    let dataArr = container.$dataArr;
    input.addEventListener('keyup', e => {
        let keyWord = input.value;
        let newData = dataArr.filter(it => {
            return it[config.display].includes(keyWord);
        })
        render(container, newData, config)
    });
}