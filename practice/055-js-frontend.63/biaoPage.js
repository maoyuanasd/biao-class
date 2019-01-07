window.biaoPage = {
    boot,
}

function boot(config) {
    let state = {};
    state.config = config;
    render(state);
}

function render(state) {
    let footer = state.footer = document.querySelector(state.config.selector);
    footer.innerHTML = ` <span class="shortcut">
    <button class="first-page">第一页</button>
    <button class="prev">上一页</button>
  <button class="prev-page">前${state.config.pageLimit}页</button>
</span>
<span class="page-list">
</span>
<span class="shortcut">
<button class="next-page">后${state.config.pageLimit}页</button>
  <button class="next">下一页</button>
  <button class="end-page">最后一页</button>
</span>`;
    state.pageList = footer.querySelector('.page-list');
    renderPageInit(state);
    bindEvents(state);
}

function getPage(state) {
    let amountPage = state.amountPage = Math.ceil(state.config.amount / state.config.limit);
    let pages = state.pages = [];
    for (let i = 0; i < amountPage; i++) {
        let item = document.createElement('button');
        item.innerHTML = i + 1;
        item.$current = i + 1;
        item.classList.add('item');
        pages.push(item);
    };
}

function renderPageInit(state) {
    getPage(state);
    rendPage(state, 0, state.config.pageLimit);
    state.initPage = 1;
}

function bindEvents(state) {
    bindClickEvent(state);
}

function bindClickEvent(state) {
    state.footer.addEventListener('click', e => {
        // clearActive(state);
        if (e.target.classList == 'next-page') {
            if (state.initPage > Math.floor(state.amountPage / state.config.pageLimit))
                return;
            state.initPage += 1;
            rendPage(state, (state.initPage - 1) * state.config.pageLimit, state.initPage * state.config.pageLimit)
        };
        if (e.target.classList == 'prev-page') {
            if (state.initPage <= 1)
                return;
            state.initPage -= 1;
            rendPage(state, (state.initPage - 1) * state.config.pageLimit, state.initPage * state.config.pageLimit)
        };
        if (e.target.classList == 'item') {
            clearActive(state)
            e.target.classList.add('active');
        };
        if (e.target.classList == 'first-page') {
            renderPageInit(state);
            clearActive(state);
            state.pages[0].classList.add('active');
            state.initPage = 1;

        };
        if (e.target.classList == 'end-page') {
            rendPage(state, state.amountPage - state.config.pageLimit, state.amountPage);
            clearActive(state);
            state.initPage = Math.floor(state.amountPage / state.config.pageLimit);
            state.pages[state.amountPage - 1].classList.add('active');
        };

        state.pages.forEach(it => {
            let onChange = state.config.onChange;
            if (it.classList.contains('active'))
                onChange && onChange(it.$current);
        });
    });
}

function rendPage(state, start, end) {
    state.pageList.innerHTML = '';
    let initPage = state.pages.slice(start, end);
    initPage.forEach((it, index) => {
        if (index == state.config.currentPage - 1) {
            it.classList.add('active');
        }
        state.pageList.appendChild(it);
    });
}

function clearActive(state) {
    state.pages.forEach(it => {
        it.classList.remove('active');
    });
}