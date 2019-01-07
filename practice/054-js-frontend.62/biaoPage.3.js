const DEFAULT_CONFIG = {
    limit       : 10,
    currentPage : 1,
  };
window.biaoPage = {
    boot,
}

function boot(settings) {
    let config={...DEFAULT_CONFIG,...settings}
   let state= {config};
 state.currentPage=config.currentPage;
 prepare(state);
 renderPage(state);  
 bindEvents(state);
}
function prepare(state){
  let biaoPage=document.createElement('div');
  biaoPage.classList.add('biao-page');
  biaoPage.innerHTML=`
  <span class="shortcuts">
    <button class="prev">上一页</button>
    <button class="first">第一页</button>
  </span>

  <span class="page-list"></span>

  <span class="shortcuts">
    <button class="last">最后一页</button>
    <button class="next">下一页</button>
  </span>`;
  state.root=document.querySelector(state.config.selector);
  state.root.innerHTML='';
  state.root.appendChild(biaoPage);
  state.el=biaoPage;
  state.pageList=biaoPage.querySelector('.page-list');
}
function renderPage(state){
    let amountPage = state.amountPage = Math.ceil(state.config.amount / state.config.limit);
    state.pageList.innerHTML='';
    let range=state.config.pageLimit;
    let current=state.currentPage;
    let radius=Math.floor(range/2);
    let diameter=radius*2;
    let start=current-radius;
    let end=current+radius;
    if(start<1){
        start=1;
        end=start+diameter;
    }
    if(end>amountPage){
        end=amountPage;
        start=amountPage-diameter;
    }
    if (amountPage <= range) {
        start = 1;
        end   = amountPage;
      }
    for(let i=start;i<=end;i++){
        let page=i;
     let btn=document.createElement('button');
     btn.innerHTML=page;
     btn.$page=page;
     if (state.currentPage === page)
     btn.classList.add('biao-page-active');
     btn.classList.add('biao-page-item');
     state.pageList.appendChild(btn);
    }
    state.buttons = state.pageList.querySelectorAll('.biao-page-item');
    // setCurrentPage(state,state.currentPage);
}
function bindEvents(state){
    state.el.addEventListener('click',e=>{
        let target = e.target;
      let page   = target.$page;
      let klass  = target.classList;
      if(page)
      setCurrentPage(state,page);
      if (klass.contains('next')){
          setCurrentPage(state, state.currentPage + 1);
         console.log(state);
      }
      if (klass.contains('prev'))
      setCurrentPage(state, state.currentPage - 1);
      if (klass.contains('first'))
      setCurrentPage(state, 1);
      if (klass.contains('last'))
      setCurrentPage(state, state.amountPage);
    })
}
function setCurrentPage (state, page){
    if (page<1)
    return  setCurrentPage(state, 1);
    if (page>state.amountPage)
    return setCurrentPage(state, state.amountPage);
    state.currentPage = page;
    let onChange = state.config.onChange;
    onChange && onChange(page, state);
    renderPage(state);

    // state.buttons.forEach(it=>{
    //     if(it.$page!=page){
    //         it.classList.remove('biao-page-active');
    //         return;
    //     }
    //     it.classList.add('biao-page-active');
    // });
}