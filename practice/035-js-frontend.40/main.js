;(function(){
    'use strict';
    const board=document.querySelector('.board');
    const inner=board.querySelector('.inner');
    let list=['修脚','贴膜','修电脑','修手机'];
    let i=0;
    inner.innerText=list[i];
    setInterval(()=>{
      let opacity=getComputedStyle(inner).opacity;
      if(opacity==1){
          inner.style.opacity=0;
          board.style.borderColor='transparent';

      }else{
          inner.style.opacity=1;
          board.style.borderColor='inherit';
          i++;
          if(i>=3)
          i=0;
          inner.innerText=list[i];
          console.log(i);
      }
    },500)
})();