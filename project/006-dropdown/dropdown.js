;(function(){
    'use strict'
    window.dropdown={
        boot
    }
    
    function boot (dropdownSelector = '.dropdown', triggerSelector = '.trigger'){
        const dropdown=document.querySelector(dropdownSelector);
            const trigger=document.querySelector(triggerSelector);
            dropdown.classList.add('biao-dropdown');
            document.body.addEventListener('click',(e)=>{
                // 如果事件来源是按钮则进行状态判断,并且返回不在执行下面的函数
                if(e.target===trigger){
                    dropdown.hidden=!dropdown.hidden
                    return
                }
                //如果事件来源为非下拉及其子项,就隐藏下拉菜单
                if(!e.target.closest('.dropdown')){
                    dropdown.hidden=true;
              
                }
            })
    }
})();