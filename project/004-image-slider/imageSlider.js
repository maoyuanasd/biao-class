;(function(){
    'use strict';
    const slider = document.querySelector('.slider1');
    const items = slider.querySelectorAll('.item1');
    let currentIndex = 0;
    let lastIndex = items.length - 1;
    // 默认配置
    let config = {
        mode: 'slider',
        interval: 1000
    }
    let userConfig;
    boot({
        mode: 'alternat',
        interval: 1000
    });
    
    function boot(custom) {
        userConfig = Object.assign({}, config, custom);
        // 初始化元素
        initEl();
        switch (userConfig.mode){
            case 'slider':
            flashSlider();
            break;
            case 'alternat':
            flashAlternat();
            break;
            default :
            flashSlider();
            break;
        }
    }
    function initEl(){
        slider.classList.add('slider');
        items.forEach(it => {
            it.classList.add('item');
        });
    }
    function flashAlternat() {
        items.forEach((el) => {
            el.style.opacity = 0;
        })
    
        show();
        setInterval(() => {
            loop();
            hide();
            show();
        }, userConfig.interval)
    }
    
    function hide() {
        let prev = getPrev();
        prev.style.opacity = 0;
    }
    
    function show() {
        let current = getCurrent();
        current.style.opacity = 1;
    }
    
    function flashSlider() {
        sliderX();
        sliderZ();
        setInterval(() => {
            loop();
            sliderX();
            sliderZ();
        }, userConfig.interval)
    }
    
    function sliderX() {
        let prev = getPrev();
        let current = getCurrent();
        let next = getNext();
        prev.style.left = -prev.offsetWidth + 'px';
        current.style.left = 0;
        next.style.left = prev.offsetWidth + 'px';
    }
    
    function sliderZ() {
        let prev = getPrev();
        let current = getCurrent();
        let next = getNext();
        prev.style.zIndex = 1;
        current.style.zIndex = 2;
        next.style.zIndex = 0;
    }
    
    function loop() {
        if (currentIndex < lastIndex) {
            currentIndex++
        } else {
            currentIndex = 0
        }
    }
    
    function getPrev() {
        if (currentIndex > 0) {
            return items[currentIndex - 1]
        } else {
            return items[lastIndex]
        }
    }
    
    function getCurrent() {
        return items[currentIndex]
    }
    
    function getNext() {
        if (currentIndex < lastIndex) {
            return items[currentIndex + 1]
        } else {
            return items[0]
        }
    }
})();