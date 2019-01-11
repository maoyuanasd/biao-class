;
(function () {
    window.biaoAlert = biaoAlert;
    let container;
    const defaultCongig = {
        type: 'info',
        containerClass: 'biao-alert-container',
        timeout: false,
        clickToClose:true,
    }

    function biaoAlert(title, config) {
        config = { ...defaultCongig,
            ...config,
            title
        };
        prepareEnv(config);
        render(config);
        showAlert(config);
        bindClickEvent(config);
    }
  function prepareEnv(config){
      container=getContains(config);
      if(getContains(config))
      return;
      container=document.createElement('div');
      container.classList.add(config.containerClass);
      document.body.appendChild(container);
  }
  function getContains(config){
      return document.querySelector('.'+config.containerClass);
  }

    function render(config) {
        let el = document.createElement('div');
        el.classList.add('biao-alert');
        el.classList.add(config.type);
        el.innerHTML = `<div class="inner">
       <div class="title">${config.title}</div>
       ${config.desc ? `<div class="desc">${config.desc}</div>` : '' }
   </div>`;
        config.el = el;
    }

    function showAlert(config) {
        container.appendChild(config.el);
        config.onopen && config.onopen(config);
        if (!config.timeout)
            return;
        setTimeout(() => {
            deletAlert(config);
        }, config.timeout)
    }

    function deletAlert(config) {
        config.el.remove();
        config.onclose && config.onclose(config);
    }

    function bindClickEvent(config){
        config.el.addEventListener('click',e=>{
            if(config.clickToClose==true)
            deletAlert(config);
            config.onclick && config.onclick(config);
        })
    }
})();