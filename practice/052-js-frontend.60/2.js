window.dropdown = {
    boot,
};

let defaultConfig = {
    display: 'name',
};

function boot(selector, list, config) {
    let container = document.querySelector(selector);

    container.$list = list;

    config = Object.assign({}, defaultConfig, config);

    prepare(container);
    setListVisible(container, false);
    render(container, list, config);
    bindFocus(container);
    bindClick(container);
    bindSelect(container, config);
    bindSearch(container, config);

}

function prepare(container) {
    container.innerHTML = `
    <div class="dropdown">
        <div class="filter">
            <input type="search">
        </div>
        <div class="list"></div>
    </div>
    `;

    container._list = container.querySelector('.list');
    container._input = container.querySelector('input');

}

function render(container, list, config) {
    container._list.innerHTML = '';

    list.forEach(it => {
        let item = document.createElement('div');
        item.classList.add('item');
        item.innerText = it[config.display];

        item.$data = it;

        container._list.appendChild(item);
    });
}

function bindSelect(container, config) {
    container._list.addEventListener('click', e => {

        let data = e.target.$data;
        let input = container._input;

        setListVisible(container, false);
        input.value = data[config.display];

        if (config.onSelect) {
            config.onSelect(data);
        }
    })
}

function bindSearch(container, config) {
    let input = container._input;
    let list = container.$list;

    input.addEventListener('keyup', e => {
        setListVisible(container, true);

        let keyword = input.value;
        let filtered = list.filter(it => {
            return it[config.display].includes(keyword);
        });

        render(container, filtered, config);
    })
}

function bindFocus(container) {
    container._input.addEventListener('focus', e => {
        setListVisible(container, true);
    })
}

function bindClick(container) {
    let body = document.querySelector('body');

    body.addEventListener('click', e => {
        if (e.target.closest('.dropdown'))
            return;
        setListVisible(container, false);
    })
}

function setListVisible(container, visible = true) {
    container._list.hidden = !visible;
}