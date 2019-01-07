window.biaoPage = {
    boot,
}

function boot(config) {
    let state = {};
    state.config = config;
    getPage(state);
    render(state);
    bindEvents(state);
}

function render(state) {
    let footer = state.footer = document.querySelector(state.config.selector);
    if (state.amountPage>=state.config.pageLimit){

        footer.innerHTML = ` <span class="shortcut">
        <button class="prev">上一页</button>
        <button class="prev-page">前${state.config.pageLimit}页</button>
        <button class="first-page">第1页</button>
        </span>
        <span class="page-list">
        </span>
        <span class="shortcut">
        <button class="end-page">第${state.amountPage}页</button>
        <button class="next-page">后${state.config.pageLimit}页</button>
        <button class="next">下一页</button>
        </span>`;
    }else{
        footer.innerHTML = ` <span class="shortcut">
        <button class="prev">上一页</button>
        </span>
        <span class="page-list">
        </span>
        <span class="shortcut">
        <button class="next">下一页</button>
        </span>`;
    }
    state.pageList = footer.querySelector('.page-list');
    renderPageInit(state);
    
}

function getPage(state) {
    let amountPage = state.amountPage = Math.ceil(state.config.amount / state.config.limit);
    let pages = state.pages = [];
    state.cutpages = [];
    for (let i = 0; i < amountPage; i++) {
        let item = document.createElement('button');
        item.innerHTML = i + 1;
        item.$current = i + 1;
        item.classList.add('biao-page-item');
        pages.push(item);
        state.cutpages.push(item);
    };
    cutPages(state)
}

function cutPages(state) {
    let cutTime = state.cutTime = Math.ceil(state.amountPage / state.config.pageLimit);
    let cutPageArr = state.cutPageArr = [];
    for (let i = 0; i < cutTime; i++) {
        cutPageArr.push(state.cutpages.splice(0, state.config.pageLimit));
    }
}

function renderPageInit(state) {
   
    state.initPage = 0;
    rendPage(state, state.initPage);
    state.pages[state.config.currentPage - 1].classList.add('biao-page-active');
    // getStateCurrent(state);
}

function bindEvents(state) {
    bindClickEvent(state);
}

function bindClickEvent(state) {
    state.footer.addEventListener('click', e => {
        // clearActive(state);
        if (e.target.classList == 'next-page') {
            renderNextPage(state)
            state.cutPageArr[state.initPage][0].classList.add('biao-page-active');
        };
        if (e.target.classList == 'prev-page') {
            renderPrevPage(state)
            state.cutPageArr[state.initPage][0].classList.add('biao-page-active');
        };
        if (e.target.classList == 'biao-page-item') {
            clearActive(state);
            e.target.classList.add('biao-page-active');
        };
        if (e.target.classList == 'first-page') {
            rendPage(state, 0)
            clearActive(state);
            state.pages[0].classList.add('biao-page-active');
            state.initPage = 1;

        };
        if (e.target.classList == 'end-page') {
            rendPage(state, state.cutTime - 1)
            clearActive(state);
            state.initPage = Math.floor(state.amountPage / state.config.pageLimit);
            state.pages[state.amountPage - 1].classList.add('biao-page-active');
        };
        if (e.target.classList == 'next') {
            let currentItem = state.pages[state.current - 1];
            let nextItem = state.pages[state.current];
            if (state.current == state.amountPage) {
                return;
            }
            currentItem.classList.remove('biao-page-active');
            nextItem && nextItem.classList.add('biao-page-active');
            if (state.nowPage + 1 > state.config.pageLimit) {
                renderNextPage(state)
                state.cutPageArr[state.initPage][0].classList.add('biao-page-active');
            }
        };
        if (e.target.classList == 'prev') {
            let currentItem = state.pages[state.current - 1];
            let prevItem = state.pages[state.current - 2];
            if (state.current == 1) {
                return;
            }
            currentItem.classList.remove('biao-page-active');
            prevItem && prevItem.classList.add('biao-page-active');
            if (state.nowPage - 1 < 1) {
                renderPrevPage(state);
                state.cutPageArr[state.initPage][state.config.pageLimit - 1].classList.add('biao-page-active');
            }
        };
        getStateCurrent(state);
    });
}

function getStateCurrent(state) {
    state.pages.forEach(it => {
        let onChange = state.config.onChange;
        if (it.classList.contains('biao-page-active')) {
            state.current = it.$current;
            state.nowPage = it.$nowPage;
            onChange && onChange(it.$current,state);
        }
    });
}

function rendPage(state, i) {
    state.pageList.innerHTML = '';
    state.cutPageArr[i].forEach((it, i) => {
        state.pageList.appendChild(it);
        it.$nowPage = i + 1;
    });
}

function renderNextPage(state) {
    clearActive(state);
    if (state.initPage >= state.cutTime - 1)
        return;
    state.initPage++;
    rendPage(state, state.initPage);
}

function renderPrevPage(state) {
    clearActive(state);
    if (state.initPage <= 0)
        return;
    state.initPage--;
    rendPage(state, state.initPage);
}

function clearActive(state) {
    state.pages.forEach(it => {
        it.classList.remove('biao-page-active');
    });
}