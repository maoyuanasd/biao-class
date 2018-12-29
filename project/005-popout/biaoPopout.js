 ;(function(){
     'use strict'
         window.biaoPopout={
            boot
         }
         
         // 声明全文变量,让全文可见
         let toggle, popup, mask, config;
         // 默认配置
         const defaultConfig = {
             position: 'center',
             offsetX: 0,
             offsetY: 0,
             on: 'click',
             keyToHide: 'Escape'
         }
         //用户需要输入的js代码
         //  变量1:开关按钮 变量2:需要弹出的窗口 变量3:用户配置
         // position 支持的位置有
         // center|top|bottom|left|right|top-left|top-right|bottom-left|bottom-right
        //  boot('#toggle', '#popup', {
        //      position: 'bottom-left',
        //      offsetX: 0,
        //      offsetY: 0,
        //      on: 'click',
        //      keyToHide: 'q'
        //  })
        
         function boot(toggleSelector, popupSelector, custom = {}) {
             toggle = document.querySelector(toggleSelector);
             popup = document.querySelector(popupSelector);
             // 加载用户配置
             loadConfig(custom)
             //准备popup
             initPopup()
             //装备mask mask为遮罩
             initMask()
             //绑定打开事件
             bindOpen()
             //绑定关闭事件
             bindClose()
        
         }
        
         function loadConfig(custom) {
             //通过合并数组的方式获取用户配置
             config = Object.assign({}, defaultConfig, custom);
         }
        
         function initPopup() {
             // 添加插件专属类，这样就可以和插件自带的CSS接应配合
             popup.classList.add('biao-popup');
             //popup一开始不应该被显示
             popup.hidden = true;
        
         }
        
         function initMask() {
             //造个新元素
             mask = document.createElement('div');
             // 加个插件类
             mask.classList.add('biao-mask');
             // 默认隐藏
             mask.hidden = true;
             // 追加到body最后
             document.body.appendChild(mask);
         }
        
         function bindOpen() {
             //当toggle被点击时,显示popup跟遮罩,并且调整popup的位置
             toggle.addEventListener(config.on, () => {
                 isVisibel(true)
                 rePositionPopup(config.position, config.offsetX, config.offsetY)
             })
         }
        
         function bindClose() {
             // 当遮罩被点击时,关闭遮罩跟popup
             mask.addEventListener(config.on, () => {
                 isVisibel(false)
             })
             // 当输入什么键拾,关闭遮罩跟popup
             window.addEventListener('keyup', (e) => {
                 if (e.key === config.keyToHide)
                     isVisibel(false);
             })
         }
        
         function isVisibel(hide) {
             //控制popup跟mask是否可见
             popup.hidden = mask.hidden = !hide
         }
         // 定位popup的位置
         function rePositionPopup(position, offsetX, offsetY) {
             // 缓存style,方便调用
             let style = popup.style;
             //获取popup的尺寸
             let width = popup.offsetWidth;
             let height = popup.offsetHeight;
             // 获取窗口的尺寸
             let windowWidth = window.innerWidth;
             let windowHeight = window.innerHeight;
             // 如果位置不是"xxx-xxx"的形式，而仅仅是"xxx"
             if (!position.includes('-')) {
                 // 如果仅指定横向
                 if (position == 'left' || position == 'right') {
                     position += '-centerx'; // 纵向就默认居中，变成"xxx-centery"
                 }
                 // 如果仅指定纵向
                 else if (position == 'top' || position == 'bottom') {
                     position += '-centery'; // 横向就默认居中，变成"xxx-centerx"
                 }
                 // 否则就全都居中，这其中就包含"center"
                 else {
                     position = 'centerx' + 'centery';
                 }
             }
             // 是否横向居中
             if (position.includes('centerx'))
                 style.left = windowWidth / 2 - width / 2 + offsetX + 'px';
             // 是否纵向居中    
             if (position.includes('centery'))
                 style.top = windowHeight / 2 - height / 2 + offsetY + 'px';
             // 是否贴在左边    
             if (position.includes('left'))
                 style.left = offsetX + 'px';
             // 是否贴在右边    
             if (position.includes('right'))
                 style.right = offsetX + 'px';
             // 是否贴在顶部    
             if (position.includes('top'))
                 style.top = offsetY + 'px';
             // 是否贴在底部    
             if (position.includes('bottom'))
                 style.bottom = offsetY + 'px';
         }
 })();