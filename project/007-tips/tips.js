;(function(){
    'use strict'
    let triggers = new Set();
        // 上次点击过的按钮
        let lastTrigger;
        boot();
    
        function boot() {
            // 绑定点击事件    
            bendEvents()
        }
    
        function bendEvents() {
            document.addEventListener('click', e => {
                // 获取元素
                let el = e.target;
                // 获取元素的自定义信息
                let content = el.dataset.popout;
                if (content) {
                    // 如果至少点击过一个按钮（不是第一次点击），
                    // 那么就隐藏上一次点击
                    lastTrigger && hide(lastTrigger);
                    // 将本次点击的按钮存为lastTrigger
                    // 为下次点击做准备
                    lastTrigger = el;
                    // 显示对应的popout
                    show(el, content);
                    // 记录到triggers中,方便统一隐藏
                    triggers.add(el);
                } else {
                    hideAll(el);
                }
            })
        }
        // 显示popout
        function show(button, content) {
            // 如果弹出框不存在
            if (!button.$popout) {
                // 新建弹出框元素
                let popout = document.createElement('div');
                popout.classList.add('popout');
                popout.innerHTML = content;
                button.$popout = popout;
                document.body.appendChild(popout);
            } else {
                // 否则直接显示弹出框
                button.$popout.hidden = false;
            }
            reposition(button);
        }
        // 隐藏popout
        function hideAll(button) {
            triggers.forEach(button => {
                button.$popout.hidden = true;
            });
        }
       // 隐藏全部popout
        function hide(button) {
            button.$popout.hidden = true;
        }
         // 调整 popout到合适的位置
        function reposition(button) {
            let p = button.$popout;
            let buttonPosition = button.getBoundingClientRect();
            switch (button.dataset.position) {
                case 'top':
                    p.style.top = buttonPosition.top - p.offsetHeight - 5 + 'px';
                    p.style.left = buttonPosition.left + 'px';
                    break;
                case 'bottom':
                    p.style.top = buttonPosition.top + button.offsetHeight + 5 + 'px';
                    p.style.left = buttonPosition.left + 'px';
                    break;
                case 'left':
                    p.style.top = buttonPosition.top + 'px';
                    p.style.left = buttonPosition.left - p.offsetWidth - 5 + 'px';
                    break;
                case 'right':
                    p.style.top = buttonPosition.top + 'px';
                    p.style.left = buttonPosition.left + button.offsetWidth + 5 + 'px';
                    break;
                    default :
                    p.style.top = buttonPosition.top + button.offsetHeight + 5 + 'px';
                    p.style.left = buttonPosition.left + 'px';
                    break;
    
            }
        }
})();
